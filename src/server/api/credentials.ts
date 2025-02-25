import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

const EXPIRES_IN = 60 * 60 * 24 * 5 * 1000; // 5 days

// https://cloud.google.com/identity-platform/docs/install-admin-sdk
// https://cloud.google.com/iam/docs/service-account-permissions
// https://firebase.google.com/docs/auth/admin/manage-cookies

export async function createCredential(request: Request, response: Response) {
  const { idToken } = request.body;
  const auth = getAuth();

  await auth.verifyIdToken(idToken);
  // TODO verify that the token is recent
  // verifyIdToken returns the decoded values from the token

  const cookie = await auth.createSessionCookie(idToken, {
    expiresIn: EXPIRES_IN,
  });
  const options = {
    maxAge: EXPIRES_IN,
    httpOnly: true,
    secure: true,
  };

  response.cookie("session", cookie, options);
  response.sendStatus(200);
}

export function deleteCredential(_request: Request, response: Response) {
  response.clearCookie("session");
  response.sendStatus(200);
}

export async function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const auth = getAuth();
  const sessionCookie = request.cookies["session"];

  try {
    await auth.verifySessionCookie(sessionCookie);
  } catch {
    response.sendStatus(401);
    return;
  }
  next();
}

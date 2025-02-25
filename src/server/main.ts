import cookieParser from "cookie-parser";
import express from "express";
import firebaseAdmin from "firebase-admin";
import ViteExpress from "vite-express";

import { getRandomColor } from "./api/colors";
import {
  createCredential,
  deleteCredential,
  requireAuth,
} from "./api/credentials";

firebaseAdmin.initializeApp({
  // For this to work, the GOOGLE_APPLICATION_CREDENTIALS environment variable
  // must point to a file that contains the credentials for a service account.
  // In Google-owned environments (e.g. Cloud Run), this is done automatically.
  // https://cloud.google.com/identity-platform/docs/install-admin-sdk#initialize-sdk-default
  credential: firebaseAdmin.credential.applicationDefault(),
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/color", requireAuth);
app.get("/color", getRandomColor);

app.post("/credential", createCredential);
app.delete("/credential", deleteCredential);

const port = +(process.env.PORT || 3000);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);

import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";

import "./color-picker";
import "./user-element";

const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};

@customElement("vite-express-example")
export class MainElement extends LitElement {
  readonly #firebaseApp: firebase.FirebaseApp;
  readonly #firebaseAuth: firebaseAuth.Auth;

  @property({ type: Object })
  user: firebaseAuth.User | null = null;

  constructor() {
    super();

    this.#firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
    this.#firebaseAuth = firebaseAuth.getAuth(this.#firebaseApp);

    firebaseAuth.onAuthStateChanged(this.#firebaseAuth, (user) => {
      this.user = user;
    });
  }

  render() {
    return html`
      <user-element
        .auth=${this.#firebaseAuth}
        .user=${this.user}
      ></user-element>
      <color-picker></color-picker>
    `;
  }
}

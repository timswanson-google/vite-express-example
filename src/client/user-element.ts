import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import * as firebaseAuth from "firebase/auth";

@customElement("user-element")
export class UserElement extends LitElement {
  readonly #authProvider = new firebaseAuth.GoogleAuthProvider();

  @property({ type: Object })
  user: firebaseAuth.User | null = null;

  @property({ type: Object })
  auth!: firebaseAuth.Auth;

  render() {
    if (this.user) {
      return html`
        <img src=${this.user.photoURL} />
        <span>${this.user.displayName} (${this.user.email})</span>
        <button @click=${this.signOut}>Sign Out</button>
      `;
    } else {
      return html`<button @click=${this.signIn}>Sign In</button>`;
    }
  }

  async signIn() {
    return firebaseAuth.signInWithPopup(this.auth, this.#authProvider);
  }

  async signOut() {
    return firebaseAuth.signOut(this.auth);
  }
}

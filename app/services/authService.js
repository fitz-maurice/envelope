import * as firebase from 'nativescript-plugin-firebase';
import { getString } from 'tns-core-modules/application-settings';

export default class AuthService {
  constructor() {
    this.auth = null;
    this.user = {
      displayName: '',
    };
  }

  isLoggedIn() {
    // return !!getString(this.userKey);
  }

  async register(creds) {
    this.user = await firebase.createUser({
      email,
      password,
    });
    return this.user;
  }

  async login(creds) {
    this.auth = await firebase
      .login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: creds.email,
          password: creds.password,
        },
      })
      .then(() => this.getUserDocument());
  }

  async loginWithGoogle() {
    this.auth = await firebase
      .login({
        type: firebase.LoginType.GOOGLE,
      })
      .then(() => this.getUserDocument());
  }

  async loginWithApple() {
    this.auth = await firebase
      .login({
        type: firebase.LoginType.APPLE,
        appleOptions: {
          locale: 'nl', // for Android
        },
      })
      .then(() => this.getUserDocument());
  }

  async refresh() {
    // TODO: See if this is needed
  }

  async resetPassword(email) {
    const result = await firebase.sendPasswordResetEmail(email);
    return JSON.stringify(result);
  }

  async getUserDocument() {
    return firebase.firestore
      .collection(`${this.auth.uid}`)
      .doc('account')
      .get()
      .then(doc => {
        const data = doc.data();
        this.user = data;
      });
  }

  logout() {
    return firebase.logout();
  }
}

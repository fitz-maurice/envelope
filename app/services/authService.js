import * as firebase from 'nativescript-plugin-firebase';
import { getString } from 'tns-core-modules/application-settings';

export default class AuthService {
  constructor() {
    this.cache = null;
  }

  isLoggedIn() {
    // return !!getString(this.userKey);
  }

  async register(creds) {
    return firebase.createUser({
      email,
      password,
    });
  }

  async login(creds) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: creds.email,
        password: creds.password,
      },
    });
  }

  async loginWithGoogle() {
    return firebase.login({
      type: firebase.LoginType.GOOGLE,
    });
  }

  async loginWithApple() {
    return firebase.login({
      type: firebase.LoginType.APPLE,
      appleOptions: {
        locale: 'nl', // for Android
      },
    });
  }

  async refresh() {
    // TODO: See if this is needed
  }

  async resetPassword(email) {
    const result = await firebase.sendPasswordResetEmail(email);
    return JSON.stringify(result);
  }

  async logout() {
    this.user = null;
    return firebase.logout();
  }
}

import Base from './base';
import * as firebase from 'nativescript-plugin-firebase';

export default class AuthService extends Base {
  constructor() {
    super();
  }

  isLoggedIn() {
    // return !!getString(this.userKey);
  }

  async register(creds) {
    this.auth = await firebase.createUser({
      email,
      password,
    });
    return this.auth;
  }

  async login(creds) {
    this.auth = await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: creds.email,
        password: creds.password,
      },
    });
  }

  async loginWithGoogle() {
    this.auth = await firebase.login({
      type: firebase.LoginType.GOOGLE,
    });
  }

  async loginWithApple() {
    this.auth = await firebase.login({
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

  logout() {
    return firebase.logout();
  }
}

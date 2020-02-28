import Base from './base';
import * as firebase from 'nativescript-plugin-firebase';

export default class AuthService extends Base {
  constructor() {
    super();
  }

  async register({ email, password }) {
    await firebase.createUser({
      email,
      password,
    });
    return this.auth;
  }

  async login(creds) {
    await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: creds.email,
        password: creds.password,
      },
    });
  }

  async loginWithGoogle() {
    await firebase.login({
      type: firebase.LoginType.GOOGLE,
    });
  }

  async loginWithApple() {
    await firebase.login({
      type: firebase.LoginType.APPLE,
      appleOptions: {
        locale: 'nl', // for Android
      },
    });
  }

  async resetPassword(email) {
    const result = await firebase.sendPasswordResetEmail(email);
    return JSON.stringify(result);
  }

  logout() {
    return firebase.logout();
  }
}

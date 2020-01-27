import * as firebase from 'nativescript-plugin-firebase';
import moment from 'moment';

export default class UserService {
  constructor() {
    this.userRef = null;
    this.auth = null;
    this.user = {
      displayName: null,
      birthday: null,
    };
  }

  /**
   * Sets a documentReference to be used later
   */
  setUserRef() {
    this.userRef = firebase.firestore
      .collection(`${this.auth.uid}`)
      .doc('account');
  }

  /**
   * Get the user document
   */
  async getUserDocument() {
    if (this.userRef === null) this.setUserRef();

    return this.userRef.get().then(doc => {
      const data = doc.data();
      this.user = data;

      if (typeof this.user === 'undefined') {
        this.createInitalUser();
      }
    });
  }

  /**
   * Update the user doc
   */
  async updateUser() {
    if (typeof this.user.birthday === 'object') {
      this.user.birthday = moment(this.user.birthday.value).format(
        'MM/DD/YYYY',
      );
    }

    return this.userRef.set({
      displayName: this.user.displayName,
      birthday: this.user.birthday,
    });
  }

  /**
   * Create Inital User
   */
  async createInitalUser() {
    return this.userRef.set({
      displayName: this.auth.displayName,
      birthday: null,
    });
  }
}

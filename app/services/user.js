import Base from './base';
import moment from 'moment';
import * as firebase from 'nativescript-plugin-firebase';
import store from '../store';

export default class UserService extends Base {
  constructor() {
    super();
    this.userRef = null;
    this.email = null;
    this.user = {
      displayName: null,
      birthday: null,
      people: [],
      iap: {},
    };
  }

  /**
   * Sets a documentReference to be used later
   */
  setUserRef() {
    this.userRef = firebase.firestore.collection(`${this.uid}`).doc('account');
  }

  /**
   * Get the user document
   */
  async getUserDocument() {
    if (this.userRef === null) this.setUserRef();

    return this.userRef.get().then(doc => {
      const data = doc.data();
      this.user = data;

      store.dispatch('checkPaying', data);

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

    return this.userRef.update({
      displayName: this.user.displayName,
      birthday: this.user.birthday,
    });
  }

  /**
   * Create Inital User
   */
  async createInitalUser() {
    return this.userRef.set({
      displayName: null,
      birthday: null,
      people: [],
    });
  }
}

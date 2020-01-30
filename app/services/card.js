import Base from './base';
import * as firebase from 'nativescript-plugin-firebase';

export default class CardService extends Base {
  constructor() {
    super();
    this.collectionRef = null;
  }

  /**
   * Sets a collectionReference to be used later
   */
  setCollectionRef() {
    this.collectionRef = firebase.firestore
      .collection(this.auth.uid)
      .doc('account')
      .collection('cards');
  }

  async createCard(card) {
    if (this.collectionRef === null) this.setCollectionRef();

    return this.collectionRef.add(card);
  }

  async getCards() {}
}

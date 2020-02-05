import Base from './base';
import * as firebase from 'nativescript-plugin-firebase';

export default class CardService extends Base {
  constructor() {
    super();
    this.cards = [];
    this.listeners = [];
    this.start = null;
    this.stop = null;
  }

  /**
   * Create a new card
   * @param {Object} card
   */
  async createCard(card) {
    return firebase.firestore.collection(`${this.uid}/account/cards`).add(card);
  }

  /**
   * Delete the card from Firestore
   * @param {String} cardID
   */
  async deleteCard(cardID) {
    firebase.firestore
      .collection(`${this.uid}/account/cards`)
      .doc(cardID)
      .delete();
  }

  /**
   * Inital request to hydrate Vuex
   */
  async getCards() {
    this.cards = [];

    await firebase.firestore
      .collection(`${this.uid}/account/cards`)
      .orderBy('date', 'desc')
      .limit(4)
      .get()
      .then(snapshots => {
        this.start = snapshots.docs[0];
        this.end = snapshots.docs[snapshots.docs.length - 1];

        const listener = ref
          .orderBy('date', 'desc')
          .startAt(this.start)
          .endAt(this.end)
          .onSnapshot(snapshot =>
            snapshot.docChanges().forEach(change => this.handleChange(change)),
          );

        this.listeners.push(listener);
      });

    return this.cards;
  }

  /**
   * Pagination request to fetch more cards
   */
  async fetchMoreCards() {
    await firebase.firestore
      .collection(`${this.uid}/account/cards`)
      .orderBy('date', 'desc')
      .startAfter(this.end)
      .limit(2)
      .get()
      .then(snapshots => {
        this.start = this.end;
        this.end = snapshots.docs[snapshots.docs.length - 1];

        const listener = ref
          .orderBy('date', 'desc')
          .startAfter(this.start)
          .endAt(this.end)
          .onSnapshot(snapshot =>
            snapshot.docChanges().forEach(change => this.handleChange(change)),
          );

        this.listeners.push(listener);
      });

    return this.cards;
  }

  /**
   * Handle changes that come through Firestore snapshots.
   * @param {Object} change
   */
  handleChange(change) {
    // NEW CARDS ADDED
    if (change.type === 'added') {
      this.cards.push({
        id: change.doc.id,
        ...change.doc.data(),
      });
    }

    // CARDS THAT WERE EDITED
    if (change.type === 'modified') {
      const card = { id: change.doc.id, ...change.doc.data() };
      const oldCard = this.cards.indexOf(
        this.cards.find(old => old.id === card.id),
      );

      if (~oldCard) {
        this.cards.splice(oldCard, 1, card);
      }
    }

    // DELETING A CARD
    if (change.type === 'removed') {
      const oldCard = this.cards.indexOf(
        this.cards.find(old => old.id === change.doc.id),
      );

      if (~oldCard) {
        this.cards.splice(oldCard, 1);
      }
    }
  }

  /**
   * Calling the listener cancels the listeners
   * for Firebase updates.
   */
  detachListeners() {
    this.cards = [];
    this.listeners.forEach(listener => listener());
  }
}

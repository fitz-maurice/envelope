import Base from './base';
import { cond } from '~/services/chain';
import * as firebase from 'nativescript-plugin-firebase';
import { setBoolean } from 'tns-core-modules/application-settings';

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
    // Add person to list only if the aren't
    // already on the list
    firebase.firestore
      .collection(`${this.uid}`)
      .doc('account')
      .update({
        people: firebase.firestore.FieldValue.arrayUnion(card.from),
      });

    setBoolean('uploadedCards', true);

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
   * Update card based off the doc id
   * @param {Object} card
   */
  async updateCard(card) {
    firebase.firestore
      .collection(`${this.uid}/account/cards`)
      .doc(card.id)
      .update({
        from: card.from,
        tag: card.tag,
        date: card.date,
      });
  }

  /**
   * Inital request to hydrate Vuex
   */
  async getCards({ tagFilter, personFilter, currentSort }) {
    this.detachListeners();
    this.cards = [];

    const ref = firebase.firestore.collection(`${this.uid}/account/cards`);

    const condRef = cond(ref.orderBy(currentSort, 'desc').limit(20))
      .if(tagFilter !== 'All', condRef => condRef.where('tag', '==', tagFilter))
      .if(personFilter !== 'All', condRef =>
        condRef.where('from', '==', personFilter),
      )
      .end();

    await condRef.get().then(snapshots => {
      this.start = snapshots.docs[0];
      this.end = snapshots.docs[snapshots.docs.length - 1];

      const listener = condRef
        .orderBy(currentSort, 'desc')
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
  async fetchMoreCards({ tagFilter, personFilter, currentSort }) {
    const ref = firebase.firestore.collection(`${this.uid}/account/cards`);

    const condRef = cond(
      ref
        .orderBy(currentSort, 'desc')
        .startAfter(this.end)
        .limit(10),
    )
      .if(tagFilter !== 'All', condRef => condRef.where('tag', '==', tagFilter))
      .if(personFilter !== 'All', condRef =>
        condRef.where('from', '==', personFilter),
      )
      .end();

    await condRef.get().then(snapshots => {
      this.start = this.end;
      this.end = snapshots.docs[snapshots.docs.length - 1];

      const listener = ref
        .orderBy(currentSort, 'desc')
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
  async detachListeners() {
    this.cards = [];
    this.start = null;
    this.stop = null;
    this.listeners.forEach(listener => listener());
    this.listeners = [];
    return true;
  }
}

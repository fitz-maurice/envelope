import Base from './base';
import * as firebase from 'nativescript-plugin-firebase';

export default class CardService extends Base {
  constructor() {
    super();
    this.collectionRef = null;
  }

  async createCard(card) {
    return firebase.firestore.collection(`${this.uid}/account/cards`).add(card);
  }

  async getCards() {
    let cards = [];

    const collection = await firebase.firestore
      .collection(`${this.uid}/account/cards`)
      .orderBy('date', 'desc');

    collection.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        // NEW CARDS ADDED
        if (change.type === 'added') {
          cards.push({ id: change.doc.id, ...change.doc.data() });
        }

        // CARDS THAT WERE EDITED
        if (change.type === 'modified') {
          const card = { id: change.doc.id, ...change.doc.data() };
          const oldCard = cards.indexOf(cards.find(old => old.id === card.id));

          if (~oldCard) {
            cards.splice(oldCard, 1, card);
          }
        }

        // DELETING A CARD
        if (change.type === 'removed') {
          const card = { id: change.doc.id, ...change.doc.data() };
          const oldCard = cards.indexOf(cards.find(old => old.id === card.id));

          if (~oldCard) {
            cards.splice(oldCard, 1);
          }
        }
      });
    });

    return cards;
  }
}

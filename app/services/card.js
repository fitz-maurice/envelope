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

    const querySnapshot = await firebase.firestore
      .collection(`${this.uid}/account/cards`)
      .get();

    querySnapshot.docSnapshots.map(doc => {
      const card = doc.data();
      const temp = card.images.map(image =>
        firebase.storage.getDownloadUrl({
          remoteFullPath: `${this.uid}/${image}`,
        }),
      );

      Promise.all(temp).then(result => {
        card.images = result;
        cards.push(card);
      });
    });

    return cards;
  }
}

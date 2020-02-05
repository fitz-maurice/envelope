import * as types from './types';
import CardService from '@/services/card';

const cardService = new CardService();

export const loadCards = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    cardService
      .getCards()
      .then(cards => {
        commit(types.SET_CARDS, cards);
        resolve();
      })
      .catch(error => {
        console.error(`Error fetching cards: ${error}.`);
        reject(error);
      });
  });
};

export const fetchMoreCards = async ({ commit }) => {
  return new Promise((resolve, reject) => {
    cardService
      .fetchMoreCards()
      .then(cards => {
        commit(types.SET_CARDS, cards);
        resolve();
      })
      .catch(error => {
        console.log(`Error fetching MORE cards: ${error}`);
        reject(error);
      });
  });
};

export const deleteCard = async (context, cardID) => {
  return new Promise((resolve, reject) => {
    cardService
      .deleteCard(cardID)
      .then(() => {
        resolve();
      })
      .catch(error => {
        console.log(`Error deleting card: ${card}`);
        reject(error);
      });
  });
};

export const clearCards = ({ commit }) => {
  return new Promise((resolve, reject) => {
    cardService
      .detachListeners()
      .then(() => {
        commit(types.CLEAR_CARDS);
        resolve();
      })
      .catch(error => {
        console.log(`Error clearing cards on logout: ${error}`);
        reject(error);
      });
  });
};

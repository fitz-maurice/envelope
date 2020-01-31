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

export const clearCards = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit(types.CLEAR_CARDS);
    resolve();
  }).catch(error => {
    console.log(`Error clearing cards on logout: ${error}`);
    reject(error);
  });
};

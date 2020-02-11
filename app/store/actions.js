import * as types from './types';
import CardService from '@/services/card';
import { fetchHolidays } from '~/services/holidays';

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

export const setSort = ({ commit }, sort) => {
  commit(types.SET_SORT, sort);
};

export const setTag = ({ commit }, tag) => {
  commit(types.SET_TAG, tag);
};

export const setPerson = ({ commit }, person) => {
  commit(types.SET_PERSON, person);
};

export const setHolidays = async ({ commit }) => {
  commit(types.SET_HOLIDAYS, await fetchHolidays());
};

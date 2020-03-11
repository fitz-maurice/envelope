import * as types from './types';
import { setBoolean } from 'tns-core-modules/application-settings';

const mutations = {
  [types.SET_CARDS](state, cards) {
    state.cards = cards;
    state.loading = false;
    if (cards.length > 0) {
      setBoolean('uploadedCards', true);
    }
  },
  [types.CLEAR_CARDS](state) {
    state.cards = [];
  },
  [types.SET_SORT](state, sort) {
    state.currentSort = sort;
  },
  [types.SET_TAG](state, tag) {
    state.tagFilter = tag;
  },
  [types.SET_HOLIDAYS](state, holidays) {
    state.holidays = holidays.sort();
  },
  [types.SET_PERSON](state, person) {
    state.personFilter = person;
  },
  [types.FILTER](state) {},
};

export default mutations;

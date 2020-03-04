import * as types from './types';

const mutations = {
  [types.SET_CARDS](state, payload) {
    const { cards, firstLoad } = payload;
    state.cards = cards;
    if (firstLoad !== true) {
      state.firstLoad = false;
    }
    state.loading = false;
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

import * as types from './types';

const mutations = {
  [types.SET_CARDS](state, cards) {
    state.cards = cards;
  },
  [types.CLEAR_CARDS](state) {
    state.cards = [];
  },
};

export default mutations;

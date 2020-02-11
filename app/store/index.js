import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cards: [],
    holidays: [],
    currentSort: 'date',
    personFilter: 0,
    tagFilter: 0,
  },
  mutations,
  actions,
  getters,
});

Vue.prototype.$store = store;

export default store;

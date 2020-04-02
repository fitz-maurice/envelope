import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';
import { filter } from './plugins';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isPaying: true,
    loading: true,
    cards: new ObservableArray([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]),
    holidays: [],
    currentSort: 'date',
    personFilter: 'All',
    tagFilter: 'All',
  },
  mutations,
  actions,
  getters,
  plugins: [filter],
});

Vue.prototype.$store = store;

export default store;

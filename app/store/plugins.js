import * as types from './types';

export const filter = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === types.FILTER) {
      store.dispatch('loadCards');
    }
  });
};

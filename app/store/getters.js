import { cond } from '~/services/chain';

export const people = state => vm => {
  return ['All'].concat(vm.$userService.user.people.sort());
};

export const cardList = (state, getters) => vm => {
  const cards = cond(
    state.cards.sort((a, b) => b[state.currentSort] - a[state.currentSort]),
  )
    .if(state.tagFilter !== 0, cards =>
      cards.filter(card => card.tag === state.holidays[state.tagFilter]),
    )
    .if(state.personFilter !== 0, cards =>
      cards.filter(
        card => card.from === getters.people(vm)[state.personFilter],
      ),
    )
    .end();

  return cards;
};

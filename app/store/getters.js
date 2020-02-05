export const cardList = state => {
  return state.cards.sort((a, b) => a.date - b.date);
};

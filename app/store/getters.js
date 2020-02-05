export const cardList = state => {
  return state.cards.sort((a, b) => b.date - a.date);
};

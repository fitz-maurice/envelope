export const tagList = state => {
  const clone = JSON.parse(JSON.stringify(state.holidays));
  clone.splice(0, 1, '');
  return clone;
};

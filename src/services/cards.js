import firestore from '@react-native-firebase/firestore';

const getCards = async (uid) => {
  const cards = [];
  const _cards = await firestore().collection(`${uid}/account/cards`).get();
};

export {getCards};

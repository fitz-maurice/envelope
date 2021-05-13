import firestore from '@react-native-firebase/firestore';

const getCards = async uid => {
  const cards = [];
  const _cards = await firestore().collection(`${uid}/account/cards`).get();
};

const editCard = (uid, doc, fields) => {
  return firestore().collection(`${uid}/account/cards`).doc(doc).update(fields);
};

const deleteCard = (uid, doc) => {
  return firestore().collection(`${uid}/account/cards`).doc(doc).delete();
};

const fetchCardHolidays = async () => {
  const response = await fetch('https://envelope.app/endpoint/holidays.json');
  const {holidays} = await response.json();
  return holidays;
};

export {getCards, editCard, deleteCard, fetchCardHolidays};

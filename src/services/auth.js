import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signUp = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

const resetPassword = email => {
  return auth().sendPasswordResetEmail(email);
};

const signOut = async () => {
  AsyncStorage.removeItem('@user');
  return auth().signOut();
};

const updateUser = (uid, fields) => {
  return firestore().doc(`${uid}/account`).update(fields);
};

const getPeople = uid => {
  return firestore()
    .doc(`${uid}/account`)
    .get()
    .then(doc => doc.data())
    .then(d => d.people);
};

export {signIn, signUp, signOut, resetPassword, updateUser, getPeople};

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signUp = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

const resetPassword = (email) => {
  return auth().sendPasswordResetEmail(email);
};

const signOut = async () => {
  AsyncStorage.removeItem('@user');
  await auth().signOut();
};

export {signIn, signUp, signOut, resetPassword};

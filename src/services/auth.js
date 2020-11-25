import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signUp = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
  // .catch((error) => Alert.alert('Error', errors.signIn[error.code]()));
};

const signOut = async () => {
  AsyncStorage.removeItem('@user');
  await auth().signOut();
};

const resetPassword = async (email) => {
  const result = await auth().sendPasswordResetEmail(email);
  return JSON.stringify(result);
};

export {signIn, signUp, signOut, resetPassword};

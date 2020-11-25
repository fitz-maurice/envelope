import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

import {colors, font} from '../config';

const LoginGoogleButton = () => {
  const onGoogleButtonPress = async () => {
    GoogleSignin.configure({
      webClientId:
        '911292377774-kn9frgr857ngk7u9eha5rns4vtmqmpn8.apps.googleusercontent.com',
    });
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }>
      <Icon name="google" size={20} color={colors.black} />
      <Text style={styles.text}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 25,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...font.button,
    marginLeft: 10,
  },
});

export {LoginGoogleButton};

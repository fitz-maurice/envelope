import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

import {colors, font} from '../config';

const LoginAppleButton = () => {
  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }
    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onAppleButtonPress()}>
      <Icon name="apple" size={20} color={colors.black} />
      <Text style={styles.text}>Continue with Apple</Text>
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

export {LoginAppleButton};

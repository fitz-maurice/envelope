import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useThemeColors} from '../services/hooks';

// Utils
import {font} from '../config';

const LoginAppleButton = () => {
  const {colors} = useThemeColors();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.white,
      padding: 15,
      borderRadius: 30,
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
    <Pressable style={styles.button} onPress={() => onAppleButtonPress()}>
      <Icon name="apple" size={20} color={colors.black} />
      <Text style={styles.text}>Continue with Apple</Text>
    </Pressable>
  );
};

export {LoginAppleButton};

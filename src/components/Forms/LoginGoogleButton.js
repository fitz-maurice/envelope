import React, {useContext} from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

// Envelope
import {font} from '../../config';
import {ThemeContext} from '../../theme';

const LoginGoogleButton = () => {
  const {theme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.white,
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
    <Pressable
      style={styles.button}
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }>
      <Icon name="google" size={20} color={theme.black} />
      <Text style={styles.text}>Continue with Google</Text>
    </Pressable>
  );
};

export {LoginGoogleButton};

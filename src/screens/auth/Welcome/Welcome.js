import React from 'react';
import { Platform } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Container, Content, Footer, Button, Text } from 'native-base';

// Styles
import styles from './styles';

const Welcome = ({ navigation }) => {
  const s = useDynamicStyleSheet(styles);

  /**
   * _signInWithGoogle
   *
   * Sign into / create account with Google
   */
  const _signInWithGoogle = async () => {
    try {
      await GoogleSignin.configure({
        scopes: [],
        webClientId:
          '911292377774-kn9frgr857ngk7u9eha5rns4vtmqmpn8.apps.googleusercontent.com',
      });
      const { accessToken, idToken } = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await firebase.auth().signInWithCredential(credential);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container style={s.background}>
      {/* Logo */}
      <Text style={s.logo}>Envelope</Text>

      {/* Action Buttons */}
      <Content padder scrollEnabled={false} contentContainerStyle={s.container}>
        <Button
          block
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate('SignUpEmail')}>
          <Text>Email</Text>
        </Button>

        <Button
          block
          style={{ marginBottom: 10 }}
          onPress={() => alert('Apple')}>
          <Text>Apple</Text>
        </Button>
        <Button block style={{ marginBottom: 10 }} onPress={_signInWithGoogle}>
          <Text>Google</Text>
        </Button>
      </Content>

      {/* Footer */}
      <Footer style={[s.background, s.footer]}>
        <Text style={s.footerText}>
          &copy; {new Date().getFullYear()} Envelope
        </Text>
      </Footer>
    </Container>
  );
};

export default Welcome;

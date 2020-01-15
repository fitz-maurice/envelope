import React from 'react';
import { Platform } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Container, Content, Footer, Button, Text } from 'native-base';
import AppleAuth, {
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

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

  /**
   * _signInWithApple
   *
   * Sign in or create an account using apple
   */
  const _signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await AppleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      const { identityToken, nonce } = appleAuthRequestResponse;

      let appleCredential = null;
      if (identityToken) {
        appleCredential = firebase.auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        );
      }

      const userCredential = await firebase
        .auth()
        .signInWithCredential(appleCredential);
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
        {AppleAuth.isSupported ? (
          <Button block style={{ marginBottom: 10 }} onPress={_signInWithApple}>
            <Text>Continue with Apple</Text>
          </Button>
        ) : null}

        <Button block style={{ marginBottom: 10 }} onPress={_signInWithGoogle}>
          <Text>Continue with Google</Text>
        </Button>

        <Button
          block
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate('SignUpEmail')}>
          <Text>Sign up with Email</Text>
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

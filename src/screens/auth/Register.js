import React, {useState, useContext, createRef} from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {
  KeyboardAccessoryView,
  KeyboardAccessoryNavigation,
} from 'react-native-keyboard-accessory';

import {browser} from '../../utils';
import {errors} from '../../config';
import {ThemeContext} from '../../theme';
import {signUp, AppContext} from '../../services';
import {Page, Container, PageTitle, Paragraph, Input} from '../../components';

const Register = () => {
  const {theme} = useContext(ThemeContext);
  const emailRef = createRef();
  const passwordRef = createRef();
  const context = useContext(AppContext);
  const fs = 17 * useWindowDimensions().fontScale;
  const [email, setEmail] = useState('admin@envelope.app');
  const [password, setPassword] = useState('Envelope1989');

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 30,
    },
    textInputButton: {
      flexShrink: 1,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.green,
    },
    button: {
      color: '#ffffff',
    },
    privacyContainer: {
      fontSize: 12,
      lineHeight: 18,
      marginHorizontal: 15,
    },
    privacyLink: {
      textDecorationLine: 'underline',
    },
  });

  /**
   * _signUp
   *
   * @param _email {String} The user email
   * @param _password {String} The user password
   */
  const _signUp = (_email, _password) => {
    context.setLoading(true);
    signUp(_email, _password)
      .then(user => {
        context.setLoading(false);
        context.setUser(user);
      })
      .catch(error => {
        context.setLoading(false);
        Alert.alert('Error', errors.signUp[error.code]());
      });
  };

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <Page>
        <Container>
          <PageTitle text="Sign up for Envelope" />

          <Paragraph text="To create an account enter your email and a strong password." />

          <View style={styles.inputContainer}>
            <Input.Email
              ref={emailRef}
              autoFocus={true}
              onChangeText={setEmail}
            />
            <Input.Password ref={passwordRef} onChangeText={setPassword} />
          </View>

          <Text style={styles.privacyContainer}>
            By signing up agree to Envelope's{' '}
            <Text
              style={styles.privacyLink}
              onPress={() => browser('https://envelope.app/terms')}>
              Terms and Conditions
            </Text>
            , and{' '}
            <Text
              style={styles.privacyLink}
              onPress={() => browser('https://envelope.app/privacy')}>
              Privacy Policy
            </Text>
            .
          </Text>
        </Container>
      </Page>
      <KeyboardAccessoryView
        animateOn="all"
        hideBorder={true}
        alwaysVisible={true}
        avoidKeyboard={true}
        androidAdjustResize={true}>
        <Pressable
          style={styles.textInputButton}
          onPress={() => _signUp(email, password)}>
          <Text style={[styles.button, {fontSize: fs}]}>Sign up</Text>
        </Pressable>
      </KeyboardAccessoryView>
      <KeyboardAccessoryNavigation
        androidAdjustResize={true}
        doneButtonTitle="Sign up"
        tintColor={theme.green}
        onDone={() => _signUp(email, password)}
        onNext={() => console.log(emailRef)}
        onPrevious={() => passwordRef.current.focus()}
      />
    </Page>
  );
};

export {Register};

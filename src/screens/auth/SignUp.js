import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  KeyboardAccessoryView,
  KeyboardAccessoryNavigation,
} from 'react-native-keyboard-accessory';

// Utils
import {colors, errors} from '../../config';

// Services
import {signUp, AppContext} from '../../services';

// Components
import {Container, AuthTitle, Paragraph, Input} from '../../components';

const SignUp = () => {
  const context = useContext(AppContext);
  const fs = 17 * useWindowDimensions().fontScale;
  const [email, setEmail] = useState('admin@envelope.app');
  const [password, setPassword] = useState('Envelope1989');

  /**
   * _signUp
   *
   * @param _email {String} The user email
   * @param _password {String} The user password
   */
  const _signUp = (_email, _password) => {
    context.setLoading(true);
    signUp(_email, _password)
      .then((user) => {
        context.setLoading(false);
        context.setUser(user);
      })
      .catch((error) => {
        context.setLoading(false);
        Alert.alert('Error', errors.signUp[error.code]());
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Container>
          <AuthTitle text="Sign up for Envelope" />

          <Paragraph text="To create an account enter your email and a strong password." />

          <Input.Email onChangeText={setEmail} />
          <Input.Password onChangeText={setPassword} />

          <Text>
            By signing up agree to Envelope's Terms and Conditions, and Privacy
            Policy.
          </Text>
        </Container>
      </View>
      <KeyboardAccessoryView
        animateOn="all"
        hideBorder={true}
        alwaysVisible={true}
        avoidKeyboard={true}
        androidAdjustResize={true}>
        <TouchableOpacity
          style={styles.textInputButton}
          onPress={() => _signUp(email, password)}>
          <Text style={[styles.button, {fontSize: fs}]}>Sign up</Text>
        </TouchableOpacity>
      </KeyboardAccessoryView>
      <KeyboardAccessoryNavigation
        androidAdjustResize={true}
        // onDone={this.onDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputView: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputButton: {
    flexShrink: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  button: {
    color: '#ffffff',
  },
});

export {SignUp};

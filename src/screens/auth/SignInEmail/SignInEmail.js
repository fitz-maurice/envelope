import React, {useState, useContext} from 'react';
// import auth from '@react-native-firebase/auth';
import {Container, Content, Form, Label, Input, Item, Toast, Button} from 'native-base';

import styles from './styles';
import errors from '../../../config/errors';
import AppContext from '../../../config/context';

const SignInEmail = ({navigation}) => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  /**
   * _signUp
   *
   * Create and authenticate a new User with Email and Password
   */
  const _signIn = async () => {
    context.setLoading(true);

    // !ToDo: Android, catch empty string...

    try {
      // await auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(() => {
      //     context.setLoading(false);
      //     navigation.navigate('Hello');
      //   })
      //   .catch(error => {
      //     context.setLoading(false);
      //     _showErrorToast(errors.signIn[error.code]());
      //   });
    } catch (error) {
      // Report error here...
    }
  };

  /**
   * _showErrorToast
   *
   * Display the error toast with message
   */
  const _showErrorToast = error => {
    setHasError(true);
    Toast.show({
      text: error,
      duration: 3000,
    });
  };

  return (
    <Container>
      <Content
        padder
        scrollEnabled={false}
        contentContainerStyle={styles.container}>
        {/* Sign Up Form */}
        <Form style={styles.form}>
          {/* Email */}
          <Item stackedLabel>
            <Label>Email</Label>
            <Input
              placeholder="jane.doe@familystandup.app"
              value={email}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              autoCorrect={false}
              autoFocus={true}
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={_email => {
                setEmail(_email);
                setHasError(false);
              }}
            />
          </Item>

          {/* Password */}
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input
              placeholder="Something super secure..."
              value={password}
              autoCapitalize="none"
              autoCompleteType="password"
              textContentType="password"
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={_password => {
                setPassword(_password);
                setHasError(false);
              }}
            />
          </Item>
        </Form>

        {/* Submit */}
        <Button block onPress={_signIn} disabled={hasError}>
          Sign in
        </Button>

        {/* Forgot Password */}
        <Button block onPress={() => navigation.navigate('ResetPassword')}>
          Forgot password?
        </Button>
      </Content>
    </Container>
  );
};

export default SignInEmail;

import React, {useState, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Label,
  Input,
  Item,
  Toast,
} from 'native-base';

import styles from './styles';
import errors from '../../../config/errors';
import AppContext from '../../../config/context';

const SignUpEmail = ({navigation}) => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  /**
   * _signUp
   *
   * Create and authenticate a new User with Email and Password
   */
  const _signUp = async () => {
    context.setLoading(true);

    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          context.setLoading(false);
        })
        .catch(error => {
          context.setLoading(false);
          _showErrorToast(errors.signUp[error.code]());
        });
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
              placeholder="email@example.com"
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
              placeholder="password"
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
        <Button
          block
          onPress={_signUp}
          style={styles.submit}
          disabled={hasError}>
          <Text>Sign up</Text>
        </Button>

        <Button block style={{marginTop: 10}} onPress={() => navigation.navigate('SignInEmail')}>
          <Text>Already have an account? Sign in</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default SignUpEmail;

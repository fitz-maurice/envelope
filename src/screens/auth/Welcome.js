import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

// Utils
import {colors, errors} from '../../config';

// Services
import {signIn, AppContext} from '../../services';

// Components
import {
  Input,
  Button,
  LoginAppleButton,
  LoginGoogleButton,
} from '../../components';

// Images
const LOGO = require('../../assets/envelope.png');
const BACKGROUND = require('../../assets/background.png');
const ENVELOPE_WHITE = require('../../assets/envelope_white.png');

const Welcome = ({navigation}) => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState('admin@envelope.app');
  const [password, setPassword] = useState('Envelope1989');

  /**
   * _signIn
   *
   * @param _email {String} The user email
   * @param _password {String} The user password
   */
  const _signIn = (_email, _password) => {
    context.setLoading(true);
    signIn(_email, _password)
      .then((user) => {
        context.setLoading(false);
        context.setUser(user);
      })
      .catch((error) => Alert.alert('Error', errors.signIn[error.code]()));
  };

  return (
    <ImageBackground style={styles.imageBackground} source={BACKGROUND}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.verticalContainer}>
        {/* Top logos */}
        <View>
          <Image source={LOGO} style={styles.seal} />
          <Image source={ENVELOPE_WHITE} style={styles.logo} />
        </View>

        {/* Sign in fields */}
        <View>
          <Input.Email onChangeText={setEmail} />
          <Input.Password onChangeText={setPassword} />
          <Button onPress={() => _signIn(email, password)} title="Sign in" />
          <Button.Clear
            onPress={() => navigation.navigate('ForgotPassword')}
            title="Forgot password?"
          />
        </View>

        <Text style={styles.or}>OR</Text>

        <View>
          {Platform.OS === 'ios' && <LoginAppleButton />}
          <LoginGoogleButton />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  verticalContainer: {
    flex: 1,
    margin: 15,
    marginTop: 60,
    justifyContent: 'space-between',
  },
  seal: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  or: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUp: {
    marginTop: 15,
    textAlign: 'center',
    color: colors.white,
    fontSize: 19,
  },
});

export {Welcome};
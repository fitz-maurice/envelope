import React, {useState, useContext, createRef} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  StatusBar,
  Text,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {
  KeyboardAccessoryView,
  KeyboardAccessoryNavigation,
} from 'react-native-keyboard-accessory';
import InAppBrowser from 'react-native-inappbrowser-reborn';

// Utils
import {errors} from '../../config';

// Services
import {signUp, AppContext} from '../../services';

// Components
import {Container, AuthTitle, Paragraph, Input} from '../../components';
import {useThemeColors} from '../../services';

const SignUp = () => {
  const {colors} = useThemeColors();
  const emailRef = createRef();
  const passwordRef = createRef();
  const context = useContext(AppContext);
  const fs = 17 * useWindowDimensions().fontScale;
  const [email, setEmail] = useState('admin@envelope.app');
  const [password, setPassword] = useState('Envelope1989');
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
      .then((user) => {
        context.setLoading(false);
        context.setUser(user);
      })
      .catch((error) => {
        context.setLoading(false);
        Alert.alert('Error', errors.signUp[error.code]());
      });
  };

  /**
   * _openLink
   *
   * @param url {String} The URL to visit
   */
  const _openLink = async (url) => {
    try {
      StatusBar.setBarStyle('light-content');
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          //   preferredBarTintColor: '#453AA4',
          //   preferredControlTintColor: 'white',
          readerMode: false,
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          //   toolbarColor: '#6200EE',
          //   secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Animations
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
        StatusBar.setBarStyle('dark-content');
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Container>
          <AuthTitle text="Sign up for Envelope" />

          <Paragraph text="To create an account enter your email and a strong password." />

          <Input.Email
            ref={emailRef}
            autoFocus={true}
            onChangeText={setEmail}
          />
          <Input.Password ref={passwordRef} onChangeText={setPassword} />

          <Text style={styles.privacyContainer}>
            By signing up agree to Envelope's{' '}
            <Text
              style={styles.privacyLink}
              onPress={() => _openLink('https://envelope.app/terms')}>
              Terms and Conditions
            </Text>
            , and{' '}
            <Text
              style={styles.privacyLink}
              onPress={() => _openLink('https://envelope.app/privacy')}>
              Privacy Policy
            </Text>
            .
          </Text>
        </Container>
      </View>
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
        tintColor={colors.green}
        onDone={() => _signUp(email, password)}
        onNext={() => console.log(emailRef)}
        onPrevious={() => passwordRef.current.focus()}
      />
    </View>
  );
};

export {SignUp};

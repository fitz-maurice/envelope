import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';

// Envelope
import {ThemeContext} from '../../theme';
import {errors} from '../../config';
import {resetPassword, AppContext} from '../../services';
import {Page, Container, Input, PageTitle, Paragraph} from '../../components';

const PasswordReset = () => {
  const {theme} = useContext(ThemeContext);
  const context = useContext(AppContext);
  const [email, setEmail] = useState('');
  const fs = 17 * useWindowDimensions().fontScale;

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 30,
    },
    textInputView: {
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInput: {
      flexGrow: 1,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#CCC',
      padding: 10,
      fontSize: 16,
      marginRight: 10,
      textAlignVertical: 'top',
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
  });

  /**
   * _resetPassword
   *
   * @param {String} _email The user email
   */
  const _resetPassword = _email => {
    context.setLoading(true);
    resetPassword(_email)
      .then(() => {
        context.setLoading(false);
        Alert.alert(
          'Success',
          'Please check your email for a link to reset your password.',
        );
      })
      .catch(error => {
        context.setLoading(false);
        Alert.alert('Error', errors.signIn[error.code]());
      });
  };

  return (
    <Page style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Page style={styles.container}>
        <Container>
          <PageTitle text="Reset your password" />
          <Paragraph text="Enter your Envelope email and we'll send you an email to follow." />
          <View style={styles.inputContainer}>
            <Input.Email autoFocus={true} onChangeText={setEmail} />
          </View>
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
          onPress={() => _resetPassword(email)}>
          <Text style={[styles.button, {fontSize: fs}]}>Send</Text>
        </Pressable>
      </KeyboardAccessoryView>
    </Page>
  );
};

export {PasswordReset};

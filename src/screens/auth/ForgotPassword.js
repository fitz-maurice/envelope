import React, {useState, useContext} from 'react';
import {
  View,
  Alert,
  StatusBar,
  StyleSheet,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';

// Utils
import {errors} from '../../config';

// Services
import {resetPassword, AppContext} from '../../services';

// Components
import {Container, Input, AuthTitle, Paragraph} from '../../components';
import {useThemeColors} from '../../services/hooks';

const ForgotPassword = () => {
  const {colors} = useThemeColors();
  const context = useContext(AppContext);
  const [email, setEmail] = useState('');
  const fs = 17 * useWindowDimensions().fontScale;
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
      backgroundColor: colors.green,
    },
    button: {
      color: '#ffffff',
    },
  });

  /**
   * _resetPassword
   *
   * @param _email {String} The user email
   */
  const _resetPassword = (_email) => {
    context.setLoading(true);
    resetPassword(_email)
      .then(() => {
        context.setLoading(false);
        Alert.alert(
          'Success',
          'Please check your email for a link to reset your password.',
        );
      })
      .catch((error) => {
        context.setLoading(false);
        console.log(error.code);
        Alert.alert('Error', errors.signIn[error.code]());
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Container>
          <AuthTitle text="Reset your password" />

          <Paragraph text="Enter your Envelope email and we'll send you an email to follow." />

          <Input.Email autoFocus={true} onChangeText={setEmail} />
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
          onPress={() => _resetPassword(email)}>
          <Text style={[styles.button, {fontSize: fs}]}>Send</Text>
        </Pressable>
      </KeyboardAccessoryView>
    </View>
  );
};

export {ForgotPassword};

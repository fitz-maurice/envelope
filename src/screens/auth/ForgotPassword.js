import React, {useState, useContext} from 'react';
import {
  View,
  Alert,
  StatusBar,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';

// Utils
import {colors} from '../../config';

// Services
import {resetPassword, AppContext} from '../../services';

// Components
import {Container} from '../../components';

const ForgotPassword = () => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState(null);

  /**
   * _resetPassword
   *
   * @param _email {String} The user email
   */
  const _resetPassword = (_email) => {
    Alert.alert('Nailed it!', 'Wohooo');
    // context.setLoading(true);
    // signUp(_email, _password)
    //   .then((user) => {
    //     context.setLoading(false);
    //     context.setUser(user);
    //   })
    //   .catch((error) => {
    //     context.setLoading(false);
    //     Alert.alert('Error', errors.signUp[error.code]());
    //   });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{flex: 1}}>
        <Container>
          <TextInput
            autoFocus={true}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
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
          <Text style={[styles.button]}>Send</Text>
        </Pressable>
      </KeyboardAccessoryView>
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

export {ForgotPassword};

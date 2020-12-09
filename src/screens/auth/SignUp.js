import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
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
import {Container, AuthTitle, Paragraph} from '../../components';
import {colors} from '../../config';

const SignUp = () => {
  const fs = 17 * useWindowDimensions().fontScale;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Container>
          <AuthTitle text="Sign up for Envelope" />

          <Paragraph text="To create an account enter your email and a strong password." />

          <TextInput
            keyboardType="email-address"
            autoFocus={true}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
          <TextInput
            autoFocus={false}
            style={styles.textInput}
            secureTextEntry={true}
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
        <TouchableOpacity
          style={styles.textInputButton}
          onPress={() => Alert.alert('Nailed it!', 'Wohooo')}>
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

export {SignUp};

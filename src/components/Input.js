import React from 'react';
import {TextInput, StyleSheet, useColorScheme} from 'react-native';
import {colors, font} from '../config';

const Input = ({
  onChangeText,
  placeholder = '',
  autoFocus = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
}) => {
  const scheme = useColorScheme();

  return (
    <TextInput
      onChangeText={(text) => onChangeText(text)}
      style={[
        styles.input,
        scheme === 'light' ? styles.inputLight : styles.inputDark,
      ]}
      placeholder={placeholder}
      autoFocus={autoFocus}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={scheme === 'light' ? colors.black : colors.white}
      underlineColorAndroid="transparent"
    />
  );
};

const Email = (props) => {
  return (
    <Input
      {...props}
      placeholder="Email"
      autoCapitalize="none"
      keyboardType="email-address"
    />
  );
};

const Password = (props) => {
  return (
    <Input
      {...props}
      placeholder="Password"
      keyboardType="email-address"
      autoCapitalize="none"
      secureTextEntry={true}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    ...font.body,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  inputLight: {
    color: colors.black,
    backgroundColor: colors.white,
  },
  inputDark: {
    color: colors.white,
    backgroundColor: colors.black,
  },
});

Input.Email = Email;
Input.Password = Password;
export {Input};

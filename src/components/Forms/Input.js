import React, {forwardRef, useContext} from 'react';
import {TextInput, StyleSheet} from 'react-native';

// Envelope
import {font} from '../../config';
import {ThemeContext} from '../../theme';

const Input = forwardRef(
  (
    {
      onChangeText,
      placeholder = '',
      autoFocus = false,
      keyboardType = 'default',
      autoCapitalize = 'sentences',
      secureTextEntry = false,
      value = '',
    },
    ref,
  ) => {
    const {theme} = useContext(ThemeContext);
    const styles = StyleSheet.create({
      input: {
        ...font.body,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 30,
        color: theme.bodyTextColor,
        backgroundColor: theme.gray,
      },
    });

    return (
      <TextInput
        ref={ref}
        value={value}
        onChangeText={text => onChangeText(text)}
        style={[styles.input]}
        placeholder={placeholder}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={theme.bodyTextColor}
        underlineColorAndroid="transparent"
      />
    );
  },
);

const Email = props => {
  return (
    <Input
      {...props}
      placeholder="Email"
      autoCapitalize="none"
      keyboardType="email-address"
    />
  );
};

const Password = props => {
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

Input.Email = Email;
Input.Password = Password;
export {Input};

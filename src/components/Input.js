import React, {forwardRef} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {font} from '../config';
import {useThemeColors} from '../services/hooks';

const Input = forwardRef(
  (
    {
      onChangeText,
      placeholder = '',
      autoFocus = false,
      keyboardType = 'default',
      autoCapitalize = 'sentences',
      secureTextEntry = false,
    },
    ref,
  ) => {
    const {colors} = useThemeColors();
    const styles = StyleSheet.create({
      input: {
        ...font.body,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 30,
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

    return (
      <TextInput
        ref={ref}
        onChangeText={(text) => onChangeText(text)}
        style={[
          styles.input,
          colors.scheme === 'light' ? styles.inputLight : styles.inputDark,
        ]}
        placeholder={placeholder}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={
          colors.scheme === 'light' ? colors.black : colors.white
        }
        underlineColorAndroid="transparent"
      />
    );
  },
);

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

Input.Email = Email;
Input.Password = Password;
export {Input};

import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

// Utils
import {colors, font} from '../config';

const Button = ({title, onPress}) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const Clear = ({title, onPress}) => (
  <Pressable style={styles.buttonClear} onPress={onPress}>
    <Text style={styles.textClear}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    marginBottom: 10,
  },
  text: {
    ...font.button,
    color: colors.white,
  },
  buttonClear: {
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textClear: {
    ...font.buttonClear,
    color: colors.white,
  },
});

Button.Clear = Clear;
export {Button};

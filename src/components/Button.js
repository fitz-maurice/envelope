import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors, font} from '../config';

const Button = ({title, onPress}) => (
  <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const Clear = ({title, onPress}) => (
  <TouchableOpacity
    style={styles.buttonClear}
    activeOpacity={0.9}
    onPress={onPress}>
    <Text style={styles.textClear}>{title}</Text>
  </TouchableOpacity>
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

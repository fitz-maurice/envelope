import React from 'react';
import {Pressable, Text, StyleSheet, useWindowDimensions} from 'react-native';

// Utils
import {colors, font} from '../config';

const Button = ({title, onPress}) => {
  const fs = 17 * useWindowDimensions().fontScale;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[styles.text, {fontSize: fs}]}>{title}</Text>
    </Pressable>
  );
};

const Clear = ({title, onPress}) => {
  const fs = 17 * useWindowDimensions().fontScale;
  return (
    <Pressable style={styles.buttonClear} onPress={onPress}>
      <Text style={[styles.textClear, {fontSize: fs}]}>{title}</Text>
    </Pressable>
  );
};

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

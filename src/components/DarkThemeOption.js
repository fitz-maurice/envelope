import React, {useContext} from 'react';
import {Pressable, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {ThemeContext} from '../theme';
import {DarkToggle} from './DarkToggle';

const DarkThemeOption = () => {
  const {theme} = useContext(ThemeContext);
  const fs = 17 * useWindowDimensions().fontScale;

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      paddingLeft: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.gray,
    },
    text: {
      color: theme.bodyTextColor,
    },
    border: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
  });

  return (
    <Pressable style={[styles.container, styles.border]}>
      <Text style={[styles.text, {fontSize: fs, color: theme.bodyTextColor}]}>
        Dark Theme
      </Text>
      <DarkToggle />
    </Pressable>
  );
};

export {DarkThemeOption};
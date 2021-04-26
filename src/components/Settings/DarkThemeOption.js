import React, {useContext} from 'react';
import {Pressable, Text, StyleSheet, useWindowDimensions} from 'react-native';

// Envelope
import {DarkToggle} from './DarkToggle';
import {ThemeContext} from '../../theme';

const DarkThemeOption = () => {
  const {theme} = useContext(ThemeContext);
  const fs = 17 * useWindowDimensions().fontScale;

  const styles = StyleSheet.create({
    container: {
      paddingLeft: 0,
      paddingVertical: 8,
      paddingHorizontal: 10,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: theme.gray,
      justifyContent: 'space-between',
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

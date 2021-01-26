import React from 'react';
import {Pressable, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Hooks
import {useThemeColors} from '../services';

const SettingsButton = ({border = true, title, onPress, logOut = false}) => {
  const {colors} = useThemeColors();
  const fs = 17 * useWindowDimensions().fontScale;
  return (
    <Pressable
      onPress={() => onPress()}
      style={[styles.container, border ? styles.border : null]}>
      <Text
        style={[
          styles.text,
          {fontSize: fs, color: logOut ? 'red' : colors.text},
        ]}>
        {title}
      </Text>
      {logOut ? null : (
        <Icon size={24} name="chevron-right" color={styles.text} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export {SettingsButton};

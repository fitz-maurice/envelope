import React, {useContext} from 'react';
import {Pressable, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ThemeContext} from '../theme';

const SettingsButton = ({border = true, title, onPress, logOut = false}) => {
  const {theme} = useContext(ThemeContext);
  const fs = 17 * useWindowDimensions().fontScale;

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingLeft: 0,
      paddingRight: 5,
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
      borderBottomColor: 'black',
    },
  });

  return (
    <Pressable
      onPress={() => onPress()}
      style={[styles.container, border ? styles.border : null]}>
      <Text
        style={[
          styles.text,
          {fontSize: fs, color: logOut ? 'red' : theme.bodyTextColor},
        ]}>
        {title}
      </Text>
      {logOut ? null : <Icon size={24} name="chevron-right" color={'black'} />}
    </Pressable>
  );
};

export {SettingsButton};

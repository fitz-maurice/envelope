import React, {useContext} from 'react';
import {Pressable, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Envelope
import {ThemeContext} from '../../theme';

const SettingsButton = ({border = true, title, onPress, logOut = false}) => {
  const {theme} = useContext(ThemeContext);
  const fs = 14 * useWindowDimensions().fontScale;

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingLeft: 0,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.gray,
    },
    text: {
      fontSize: fs,
      color: theme.bodyTextColor,
    },
    border: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    logOut: {
      color: theme.red,
      fontWeight: 'bold',
    },
    normal: {
      color: theme.bodyTextColor,
      fontWeight: 'normal',
    },
  });

  return (
    <Pressable
      onPress={() => onPress()}
      style={[styles.container, border ? styles.border : null]}>
      <Text
        allowFontScaling={false}
        suppressHighlighting={true}
        style={[styles.text, logOut ? styles.logOut : styles.normal]}>
        {title}
      </Text>
      {logOut ? null : <Icon size={18} name="chevron-right" color={'gray'} />}
    </Pressable>
  );
};

export {SettingsButton};

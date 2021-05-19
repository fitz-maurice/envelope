import React, {useContext} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Envelope
import {font} from '../../config';
import {ThemeContext} from '../../theme';

const Button = ({title, onPress}) => {
  const {theme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    button: {
      height: 50,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.green,
      marginBottom: 10,
    },
    text: {
      ...font.button,
      color: theme.white,
    },
  });

  const fs = 17 * useWindowDimensions().fontScale;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[styles.text, {fontSize: fs}]}>{title}</Text>
    </Pressable>
  );
};

const Clear = ({title, onPress}) => {
  const {theme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    buttonClear: {
      height: 50,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    textClear: {
      ...font.buttonClear,
      color: theme.white,
    },
  });

  const fs = 17 * useWindowDimensions().fontScale;
  return (
    <Pressable style={styles.buttonClear} onPress={onPress}>
      <Text style={[styles.textClear, {fontSize: fs}]}>{title}</Text>
    </Pressable>
  );
};

const Red = ({title, onPress}) => {
  const {theme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    buttonClear: {
      height: 50,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      backgroundColor: theme.red,
    },
    textClear: {
      ...font.buttonClear,
      color: theme.white,
    },
  });

  const fs = 17 * useWindowDimensions().fontScale;
  return (
    <Pressable style={styles.buttonClear} onPress={onPress}>
      <Text style={[styles.textClear, {fontSize: fs}]}>{title}</Text>
    </Pressable>
  );
};

const FAB = ({title, icon, onPress}) => {
  const {theme} = useContext(ThemeContext);
  const fs = 12 * useWindowDimensions().fontScale;
  const styles = StyleSheet.create({
    buttonFAB: {
      height: 30,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      width: '33%',
      backgroundColor: `${theme.red}BF`,
      display: 'flex',
      flexDirection: 'row',
    },
    textFAB: {
      color: theme.white,
      marginBottom: 1,
    },
    icon: {
      marginRight: 8,
    },
    view: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.view}>
      <Pressable style={styles.buttonFAB} onPress={onPress}>
        <Icon size={12} name={icon} color="white" style={styles.icon} />
        <Text style={[styles.textFAB, {fontSize: fs}]}>{title}</Text>
      </Pressable>
    </View>
  );
};

Button.FAB = FAB;
Button.Red = Red;
Button.Clear = Clear;
export {Button};

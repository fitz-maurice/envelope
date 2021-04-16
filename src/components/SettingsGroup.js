import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../theme';

const SettingsGroup = ({children}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={[styles.container, {backgroundColor: theme.gray}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    borderRadius: 10,
    paddingLeft: 20,
    overflow: 'hidden',
  },
});

export {SettingsGroup};

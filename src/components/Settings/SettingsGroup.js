import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';

// Envelope
import {ThemeContext} from '../../theme';

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
    paddingLeft: 20,
    borderRadius: 10,
    marginVertical: 20,
    overflow: 'hidden',
  },
});

export {SettingsGroup};

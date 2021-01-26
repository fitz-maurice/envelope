import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useThemeColors} from '../services';

const SettingsGroup = ({children}) => {
  const {colors} = useThemeColors();
  return (
    <View style={[styles.container, {backgroundColor: colors.gray}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 10,
    paddingLeft: 20,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 15,
  },
  text: {},
});

export {SettingsGroup};

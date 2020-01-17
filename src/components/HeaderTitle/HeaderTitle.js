import React from 'react';
import { Platform, Text } from 'react-native';
import { useDynamicStyleSheet, useDynamicValue } from 'react-native-dark-mode';

import styles from './styles';
import globals from '../../config/globals';

const HeaderTitle = props => {
  const s = useDynamicStyleSheet(styles);
  const style =
    Platform.OS === 'ios'
      ? useDynamicValue(
          globals.fonts.ios.lightMode.title3Emphasized,
          globals.fonts.ios.darkMode.title3,
        )
      : useDynamicValue(
          globals.fonts.android.lightMode.title,
          globals.fonts.android.darkMode.title,
        );

  return <Text style={[style, s.title]}>{props.children}</Text>;
};

export default HeaderTitle;

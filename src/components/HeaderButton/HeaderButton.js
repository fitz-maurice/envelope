import React from 'react';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import { useDynamicStyleSheet, useDynamicValue } from 'react-native-dark-mode';

import styles from './styles';

const HeaderButton = props => {
  const s = useDynamicStyleSheet(styles);

  return (
    <Button transparent onPress={() => props.navigation.goBack()}>
      <Icon size={24} name={props.icon} color={s.color.color} />
    </Button>
  );
};

export default HeaderButton;

import React from 'react';
import {Text, StyleSheet} from 'react-native';

const HeaderTitle = ({text}) => (
  <Text allowFontScaling={false} style={styles.title}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: 'Castoro-Regular',
  },
});

export {HeaderTitle};

import React from 'react';
import {Text, StyleSheet} from 'react-native';

const HeaderTitle = ({text}) => <Text style={styles.title}>{text}</Text>;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Castoro-Regular',
    fontSize: 24,
  },
});

export {HeaderTitle};

import React from 'react';
import {Text, StyleSheet} from 'react-native';

const HeaderTitle = ({text}) => <Text style={styles.title}>{text}</Text>;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'Castoro-Regular',
  },
});

export {HeaderTitle};

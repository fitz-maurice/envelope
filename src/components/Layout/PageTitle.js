import React from 'react';
import {Text, StyleSheet} from 'react-native';

const PageTitle = ({text}) => <Text style={styles.title}>{text}</Text>;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Castoro-Regular',
    fontSize: 32,
    lineHeight: 32,
    marginTop: 20,
  },
});

export {PageTitle};

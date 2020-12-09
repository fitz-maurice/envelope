import React from 'react';
import {Text, StyleSheet} from 'react-native';

const AuthTitle = ({text}) => <Text style={styles.title}>{text}</Text>;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Castoro-Regular',
    fontSize: 32,
    marginVertical: 20,
  },
});

export {AuthTitle};

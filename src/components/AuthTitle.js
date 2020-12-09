import React from 'react';
import {Text, StyleSheet} from 'react-native';

const AuthTitle = ({text}) => <Text style={styles.title}>{text}</Text>;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginVertical: 20,
  },
});

export {AuthTitle};

import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Paragraph = ({text}) => <Text style={styles.text}>{text}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export {Paragraph};

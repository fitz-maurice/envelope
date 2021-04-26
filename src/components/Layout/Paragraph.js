import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Paragraph = ({text}) => <Text style={styles.text}>{text}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 30,
  },
});

export {Paragraph};

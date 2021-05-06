import React from 'react';
import {Text, StyleSheet, useWindowDimensions} from 'react-native';

const PageTitle = ({text}) => {
  const fs = 30 * useWindowDimensions().fontScale;

  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Castoro-Regular',
      fontSize: fs,
      lineHeight: 32,
      marginTop: 20,
    },
  });

  return <Text style={styles.title}>{text}</Text>;
};

export {PageTitle};

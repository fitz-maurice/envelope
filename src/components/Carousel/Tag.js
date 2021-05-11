import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Tag = ({tag}) => {
  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    tag: {
      right: 0,
      position: 'absolute',
      margin: 10,
      borderRadius: 5,
      padding: 5,
      paddingBottom: 3,
      backgroundColor: 'white',
    },
    text: {
      fontSize: 12,
      lineHeight: 12,
      textTransform: 'uppercase',
    },
  });

  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{tag}</Text>
    </View>
  );
};

export {Tag};

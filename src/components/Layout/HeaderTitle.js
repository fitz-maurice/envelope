import React from 'react';
import {Text, StyleSheet, useWindowDimensions} from 'react-native';

const HeaderTitle = ({text}) => {
  const fs = 25 * useWindowDimensions().fontScale;

  const styles = StyleSheet.create({
    title: {
      fontSize: fs,
      fontFamily: 'Castoro-Regular',
    },
  });

  return (
    <Text allowFontScaling={false} style={styles.title}>
      {text}
    </Text>
  );
};

export {HeaderTitle};

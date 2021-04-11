import React from 'react';
import {View, StyleSheet} from 'react-native';

const Page = ({children}) => <View style={styles.page}>{children}</View>;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export {Page};

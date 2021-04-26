import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Loader = () => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.square}>
        <ActivityIndicator />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    position: 'absolute',
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    zIndex: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});

export {Loader};

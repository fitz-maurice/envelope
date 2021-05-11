import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const Pagination = memo(({images, index}) => {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {images.map((_, i) => {
        return (
          <View
            key={i}
            style={[styles.dot, index === i ? styles.active : styles.inactive]}
          />
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
    marginTop: -28,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  active: {
    backgroundColor: '#5C5F3E',
  },
  inactive: {
    backgroundColor: 'white',
  },
});

export {Pagination};

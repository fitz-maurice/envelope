import React, {memo} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';

const Slide = memo(({image}) => {
  const {width} = Dimensions.get('window');

  const styles = StyleSheet.create({
    size: {
      width,
      height: width,
    },
    slide: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={[styles.slide, styles.size]}>
      <Image
        style={styles.size}
        source={{uri: `data:image/png;base64,${image}`}}
      />
    </View>
  );
});

export {Slide};

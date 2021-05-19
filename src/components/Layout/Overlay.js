import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Overlay = ({large}) => {
  const firstImageSize = Dimensions.get('window').width;

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    view: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    iconView: {
      margin: 5,
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 15,
      height: 15,
      color: 'white',
      backgroundColor: 'deepskyblue',
      borderRadius: 99,
      borderColor: 'white',
      borderWidth: 1,
    },
    iconOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'black',
      opacity: 0.3,
      height: '100%',
      width: '100%',
    },
    largeSelectedContainer: {
      width: firstImageSize,
      height: firstImageSize,
      position: 'absolute',
    },
  });

  return (
    <View style={large ? styles.largeSelectedContainer : styles.view}>
      <View style={styles.iconOverlay} />
      <View style={styles.iconView}>
        <Icon size={13} name="check" color="white" />
      </View>
    </View>
  );
};

export {Overlay};

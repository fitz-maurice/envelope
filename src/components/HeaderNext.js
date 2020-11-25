import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

const HeaderNext = ({navigation}) => (
  <HeaderButtons
    left={true}
    HeaderButtonComponent={(props) => (
      <TouchableOpacity
        style={styles.margin}
        onPress={() => navigation.navigate('Upload')}>
        <Text>Next</Text>
      </TouchableOpacity>
    )}>
    <Item
      color={'#222222'}
      title="Take picture"
      iconName="camera"
      onPress={() => navigation.navigate('Camera')}
    />
  </HeaderButtons>
);

const styles = StyleSheet.create({
  margin: {
    marginRight: 9,
  },
});

export {HeaderNext};

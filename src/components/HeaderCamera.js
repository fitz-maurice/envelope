import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';

const HeaderCamera = ({navigation}) => (
  <HeaderButtons
    left={true}
    HeaderButtonComponent={(props) => (
      <HeaderButton
        IconComponent={() => (
          <View style={styles.margin}>
            <Icon size={24} name="camera" />
          </View>
        )}
        {...props}
      />
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
    marginLeft: 9,
  },
});

export {HeaderCamera};

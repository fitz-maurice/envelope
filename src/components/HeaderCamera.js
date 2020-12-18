import React from 'react';
import {useColorScheme} from 'react-native';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import {colors} from '../config/colors';

const HeaderCamera = ({navigation}) => {
  const theme = useColorScheme();

  return (
    <HeaderButtons
      left={true}
      HeaderButtonComponent={(props) => (
        <HeaderButton
          IconComponent={() => (
            <View style={styles.margin}>
              <Icon size={24} name="camera" color={colors.text(theme)} />
            </View>
          )}
          {...props}
        />
      )}>
      <Item
        color={colors.text(theme)}
        title="Take picture"
        iconName="camera"
        onPress={() => navigation.navigate('Camera')}
      />
    </HeaderButtons>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginLeft: 9,
  },
});

export {HeaderCamera};

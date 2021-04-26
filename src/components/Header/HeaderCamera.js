import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import {ThemeContext} from '../theme';

const HeaderCamera = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <HeaderButtons
      left={true}
      HeaderButtonComponent={props => (
        <HeaderButton
          IconComponent={() => (
            <View style={styles.margin}>
              <Icon size={24} name="camera" color={theme.green} />
            </View>
          )}
          {...props}
        />
      )}>
      <Item
        color={theme.bodyTextColor}
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

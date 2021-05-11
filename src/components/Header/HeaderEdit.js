import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';

// Envelope
import {ThemeContext} from '../../theme';

const HeaderEdit = ({navigation, image}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <HeaderButtons
      right={true}
      HeaderButtonComponent={props => (
        <HeaderButton
          IconComponent={() => (
            <View style={styles.margin}>
              <Icon size={24} name="edit" color={theme.green} />
            </View>
          )}
          {...props}
        />
      )}>
      <Item
        color={theme.green}
        title="Edit Card Details"
        iconName="edit"
        onPress={() => navigation.navigate('Edit', {image})}
      />
    </HeaderButtons>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginRight: 4,
  },
});

export {HeaderEdit};

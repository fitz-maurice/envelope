import React, {useContext} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {ThemeContext} from '../theme';

const HeaderNext = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <HeaderButtons
      left={true}
      HeaderButtonComponent={(props) => (
        <Pressable
          style={styles.margin}
          onPress={() => navigation.navigate('Upload')}>
          <Text style={{color: theme.bodyTextColor}}>Next</Text>
        </Pressable>
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
    marginRight: 9,
  },
});

export {HeaderNext};

import React, {useContext} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {HeaderButtons} from 'react-navigation-header-buttons';

// Envelope
import {ThemeContext} from '../../theme';

const HeaderNext = ({navigation, selected}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <HeaderButtons left={false}>
      <Pressable
        style={styles.margin}
        onPress={() => navigation.navigate('Upload', {selected})}>
        <Text style={[styles.text, {color: theme.green}]}>Next</Text>
      </Pressable>
    </HeaderButtons>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginRight: 9,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export {HeaderNext};

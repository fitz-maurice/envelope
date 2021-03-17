import React, {useCallback, useContext} from 'react';
import {Text, View, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {ThemeContext} from '../../../theme';

const Advanced = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Advanced',
        headerRight: null,
      });
    }, [navigation]),
  );

  const styles = {
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor,
    },
    text: {fontSize: 30, color: theme.bodyTextColor},
  };

  return (
    <View style={styles.view}>
      <StatusBar barStyle={theme.appbar.barStyle} />
      <Text style={styles.text}>Advanced</Text>
    </View>
  );
};

export {Advanced};

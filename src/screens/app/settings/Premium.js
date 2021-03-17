import React, {useCallback, useContext} from 'react';
import {Text, View, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ThemeContext} from '../../../theme';

const Premium = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Premium',
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
    text: {
      fontSize: 30,
      color: theme.bodyTextColor,
    },
  };

  return (
    <View style={styles.view}>
      <StatusBar barStyle={theme.appbar.barStyle} />
      <Text style={styles.text}>Premium</Text>
    </View>
  );
};

export {Premium};

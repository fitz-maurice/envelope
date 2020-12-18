import React, {useCallback} from 'react';
import {Text, View, StatusBar, useColorScheme} from 'react-native';
import {colors} from '../../../config/colors';
import {useFocusEffect} from '@react-navigation/native';

const Premium = ({navigation}) => {
  const theme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Premium',
        headerRight: null,
        headerStyle: {
          backgroundColor: colors.gray,
        },
        headerTintColor: colors.text(theme),
      });
    }, [navigation, theme]),
  );

  const styles = {
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundColor,
    },
    text: {
      fontSize: 30,
      color: colors.text(theme),
    },
  };

  return (
    <View style={styles.view}>
      <StatusBar barStyle={colors.statusBar(theme)} />
      <Text style={styles.text}>Premium</Text>
    </View>
  );
};

export {Premium};

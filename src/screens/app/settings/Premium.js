import React, {useCallback} from 'react';
import {Text, View, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useThemeColors} from '../../../services/hooks';

const Premium = ({navigation}) => {
  const {colors} = useThemeColors();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Premium',
        headerRight: null,
        headerStyle: {
          backgroundColor: colors.gray,
        },
        headerTintColor: colors.text,
      });
    }, [navigation]),
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
      color: colors.text,
    },
  };

  return (
    <View style={styles.view}>
      <StatusBar barStyle={colors.statusBar} />
      <Text style={styles.text}>Premium</Text>
    </View>
  );
};

export {Premium};

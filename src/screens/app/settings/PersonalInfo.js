import React, {useCallback} from 'react';
import {Text, View, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useThemeColors} from '../../../services/hooks';

const PersonalInfo = ({navigation}) => {
  const {colors} = useThemeColors();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Personal Info',
        headerRight: null,
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
      <Text style={styles.text}>Personal Info</Text>
    </View>
  );
};

export {PersonalInfo};

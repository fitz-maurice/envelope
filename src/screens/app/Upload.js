import React, {useCallback} from 'react';
import {Button, Text, View, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const Upload = ({navigation}) => {
  // useFocusEffect(
  //   useCallback(() => {
  //     const stackNavigator = navigation.dangerouslyGetParent();

  //     if (stackNavigator) {
  //       stackNavigator.setOptions({
  //         headerLeft: () => <HeaderCamera navigation={navigation} />,
  //         title: 'Envelope',
  //       });
  //     }
  //   }, [navigation]),
  // );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar barStyle="dark-content" />
      <Text style={{fontSize: 30}}>Upload</Text>
    </View>
  );
};

export {Upload};

import React from 'react';
import {Text, View, StatusBar} from 'react-native';

const Advanced = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar barStyle="dark-content" />
      <Text style={{fontSize: 30}}>Advanced</Text>
    </View>
  );
};

export {Advanced};

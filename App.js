/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Button, Text } from 'native-base';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>Welcome to Envelope!</Text>
          <Button>
            <Text>Just to makes sure native base works</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;

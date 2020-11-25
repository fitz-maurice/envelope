import React, {useCallback} from 'react';
import {View, Text, Button, Linking, Alert, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Rate, {AndroidMarket} from 'react-native-rate';

import {signOut} from '../../services';

const Settings = ({navigation}) => {
  // Set header elements on focus
  useFocusEffect(
    useCallback(() => {
      const stackNavigator = navigation.dangerouslyGetParent();

      if (stackNavigator) {
        stackNavigator.setOptions({
          headerLeft: null,
          headerRight: null,
          title: 'Settings',
        });
      }
    }, [navigation]),
  );

  const openLink = async () => {
    try {
      StatusBar.setBarStyle('light-content');
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open('https://envelope.app', {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
        });
        StatusBar.setBarStyle('dark-content');
      } else {
        Linking.openURL('https://envelope.app');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>Settings</Text>
      <Button
        title="Personal Info"
        onPress={() => navigation.navigate('PersonalInfo')}
      />
      <Button
        title="Advanced"
        onPress={() => navigation.navigate('Advanced')}
      />
      <Button title="Premium" onPress={() => navigation.navigate('Premium')} />

      <Button
        title="Email Support"
        onPress={() =>
          Linking.openURL(
            'mailto:admin@envelope.app?subject=Envelope%20Support%20Ticket',
          )
        }
      />
      <Button onPress={() => openLink()} title="www.google.com" />
      <Button
        title="Rate App"
        onPress={() => {
          const options = {
            AppleAppID: '2193813192',
            GooglePackageName: 'com.mywebsite.myapp',
            OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: true,
            fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html',
          };
          Rate.rate(options, (success) => {
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
              // this.setState({rated: true});
            }
          });
        }}
      />
      <Button title="Log Out" onPress={() => signOut()} />
    </View>
  );
};

export {Settings};

import React, {useCallback, useState} from 'react';
import {View, Linking, Alert, StatusBar, StyleSheet, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Rate, {AndroidMarket} from 'react-native-rate';
import {getBuildNumber, getVersion} from 'react-native-device-info';

import {signOut, useThemeColors} from '../../../services';

import {SettingsGroup, SettingsButton} from '../../../components';

const Settings = ({navigation}) => {
  const {colors} = useThemeColors();

  // Set header elements on focus
  useFocusEffect(
    useCallback(() => {
      const stackNavigator = navigation.dangerouslyGetParent();

      if (stackNavigator) {
        stackNavigator.setOptions({
          headerLeft: null,
          headerRight: null,
          title: 'Settings',
          headerStyle: {
            backgroundColor: colors.gray,
          },
          headerTintColor: colors.text,
        });
      }
    }, [navigation, colors]),
  );

  const openLink = async (page) => {
    try {
      StatusBar.setBarStyle('light-content');
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(`https://envelope.app/${page}`, {
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
        StatusBar.setBarStyle(colors.statusBar);
      } else {
        Linking.openURL(`https://envelope.app/${page}`);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const container = {
    view: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: colors.backgroundColor,
    },
  };

  return (
    <View style={container.view}>
      <SettingsGroup>
        <SettingsButton
          title="Personal Info"
          onPress={() => navigation.navigate('PersonalInfo')}
        />
        <SettingsButton
          border={false}
          title="Advanced"
          onPress={() => navigation.navigate('Advanced')}
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsButton
          border={false}
          title="Premium"
          onPress={() => navigation.navigate('Premium')}
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsButton
          title="Appearance"
          onPress={() => navigation.navigate('Appearance')}
        />
        <SettingsButton
          title="Email Support"
          onPress={() =>
            Linking.openURL(
              'mailto:admin@envelope.app?subject=Envelope%20Support%20Ticket',
            )
          }
        />
        <SettingsButton
          border={false}
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
      </SettingsGroup>

      <SettingsGroup>
        <SettingsButton
          title="Privacy Policy"
          onPress={() => openLink('privacy')}
        />
        <SettingsButton
          border={false}
          title="Terms of Service"
          onPress={() => openLink('terms')}
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsButton
          logOut={true}
          border={false}
          title="Log Out"
          onPress={() => signOut()}
        />
      </SettingsGroup>

      <View style={styles.footnote}>
        <Text style={styles.fnText}>
          Envelope App {'\u00A9'} {new Date().getFullYear()}
        </Text>
        <Text style={styles.fnText}>
          {getVersion()} ({getBuildNumber()})
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footnote: {
    margin: 25,
  },
  fnText: {
    lineHeight: 25,
    textAlign: 'center',
  },
});

export {Settings};

import React, {useCallback, useContext} from 'react';
import {View, Linking, StyleSheet, Text} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';
import {useFocusEffect} from '@react-navigation/native';
import {getBuildNumber, getVersion} from 'react-native-device-info';

// Envelope
import {
  Page,
  SettingsGroup,
  SettingsButton,
  DarkThemeOption,
  Container,
  HeaderTitle,
} from '../../../components';
import {browser} from '../../../utils';
import {signOut} from '../../../services';
import {ThemeContext} from '../../../theme';

const Settings = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      const stackNavigator = navigation.dangerouslyGetParent();
      if (stackNavigator) {
        stackNavigator.setOptions({
          headerLeft: null,
          headerRight: null,
          title: <HeaderTitle text="Settings" />,
        });
      }
    }, [navigation]),
  );

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    footnote: {
      margin: 15,
    },
    fnText: {
      lineHeight: 25,
      textAlign: 'center',
      color: theme.bodyTextColor,
    },
  });

  return (
    <Page>
      <Container>
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
          <DarkThemeOption />
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
                AppleAppID: '1494081818',
                GooglePackageName: 'com.envelope.fitzcreative',
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: true,
                openAppStoreIfInAppFails: true,
                fallbackPlatformURL: 'https://envelope.app/',
              };
              Rate.rate(options, success => {
                if (success) {
                  this.setState({rated: true});
                }
              });
            }}
          />
        </SettingsGroup>

        <SettingsGroup>
          <SettingsButton
            title="Privacy Policy"
            onPress={() => browser('https://envelope.app/privacy')}
          />
          <SettingsButton
            border={false}
            title="Terms of Service"
            onPress={() => browser('https://envelope.app/terms')}
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
      </Container>
    </Page>
  );
};

export {Settings};

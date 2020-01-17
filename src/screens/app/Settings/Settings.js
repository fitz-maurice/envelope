import React, { useState, useEffect, useContext } from 'react';
import { View, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Feather';
import Rate, { AndroidMarket } from 'react-native-rate';
import firestore from '@react-native-firebase/firestore';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { getVersion, getBuildNumber } from 'react-native-device-info';
import {
  Container,
  Content,
  Text,
  Button,
  ListItem,
  Left,
  Body,
  Right,
  Separator,
  Input,
  Toast,
} from 'native-base';

import styles from './styles';
import globals from '../../../config/globals';
import AppContext from '../../../config/context';
import HeaderTitle from '../../../components/HeaderTitle';
import HeaderButton from '../../../components/HeaderButton';

const Settings = ({ navigation }) => {
  const s = useDynamicStyleSheet(styles);
  const context = useContext(AppContext);
  const [fullName, setFullName] = useState(auth().currentUser.displayName);
  const [birthday, setBirthday] = useState();

  useEffect(() => {
    const fetchUserDocument = async () => {
      const querySnapshot = await firestore()
        .doc(`${auth().currentUser.uid}/account`)
        .get();

      if (typeof querySnapshot._data !== 'undefined') {
        setBirthday(querySnapshot._data.birthday);
      }
    };

    fetchUserDocument();
  }, []);

  /**
   * _signOut
   *
   * Sign out of the application and clean it up
   */
  const _signOut = () => {
    auth().signOut();
  };

  /**
   * _rateApp
   *
   * Open the iOS or Android rating modal
   */
  const _rateApp = () => {
    Rate.rate(
      {
        AppleAppID: '1494081818',
        GooglePackageName: 'com.fitzcreative.envelope',
        preferredAndroidMarket: AndroidMarket.Google,
        preferInApp: true,
        openAppStoreIfInAppFails: true,
      },
      success => {
        if (success) {
          // this technically only tells us if the user successfully went to the Review Page.
          // Whether they actually did anything, we do not know.
          console.log('Here');
        }
      },
    );
  };

  const _saveUser = () => {
    context.setLoading(true);
    const user = auth().currentUser.updateProfile({
      displayName: fullName,
    });
    const account = firestore()
      .doc(`${auth().currentUser.uid}/account`)
      .set({
        displayName: fullName,
        birthday: birthday,
      });

    Promise.all([user, account]).then(() => {
      context.setLoading(false);
      Toast.show({
        text: 'Account updated',
        duration: 3000,
      });
    });
  };

  /**
   * _terms
   *
   * Open the Terms & Conditions page on envolope.app
   */
  const _terms = () => {
    context.setLoading(true);
    navigation.navigate('WebView', {
      name: 'Terms & Conditions',
      uri: 'https://envelope.app/terms?m=true',
      backgroundColor: s.header.backgroundColor,
    });
  };

  /**
   * _privacy
   *
   * Open the Privacy Policy page on envolope.app
   */
  const _privacy = () => {
    context.setLoading(true);
    navigation.navigate('WebView', {
      name: 'Privacy Policy',
      uri: 'https://envelope.app/privacy?m=true',
      backgroundColor: s.header.backgroundColor,
    });
  };

  /**
   * _helpCenter
   *
   * Open the Help Center page on envolope.app
   */
  const _helpCenter = () => {
    context.setLoading(true);
    navigation.navigate('WebView', {
      name: 'Help Center',
      uri: 'https://envelope.app/help-center?m=true',
      backgroundColor: s.header.backgroundColor,
    });
  };

  return (
    <Container>
      <Content>
        {/* Settings */}
        <Separator bordered>
          <Text>SETTINGS</Text>
        </Separator>
        <ListItem icon>
          <Left>
            <Button>
              <Icon transparent name="user" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Input
              placeholder="Full name"
              value={fullName}
              autoCapitalize="words"
              autoCompleteType="name"
              textContentType="name"
              autoCorrect={false}
              onChangeText={_fullName => {
                setFullName(_fullName);
              }}
            />
          </Body>
        </ListItem>
        <ListItem icon last>
          <Left>
            <Button>
              <Icon transparent name="calendar" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Input
              placeholder="Birthday (mm/dd/yyyy)"
              value={birthday}
              textContentType="telephoneNumber"
              autoCorrect={false}
              onChangeText={_birthday => {
                setBirthday(_birthday);
              }}
            />
          </Body>
        </ListItem>
        <Button block full onPress={_saveUser}>
          <Text>Save</Text>
        </Button>

        {/* Support */}
        <Separator bordered>
          <Text>SUPPORT</Text>
        </Separator>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="mail" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>Email Support</Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="settings" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>Advanced</Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>
        <ListItem icon last onPress={_helpCenter}>
          <Left>
            <Button>
              <Icon active name="help-circle" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>Help Center</Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>

        {/* About */}
        <Separator bordered>
          <Text>ABOUT</Text>
        </Separator>
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="thumbs-up" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>Refer a Friend</Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>
        <ListItem icon onPress={_rateApp}>
          <Left>
            <Button>
              <Icon active name="star" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>
              Rate in the{' '}
              {Platform.OS === 'ios' ? 'App Store' : 'Google Play Store'}
            </Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>
        <ListItem icon last>
          <Left>
            <Button>
              <Icon active name="twitter" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>Follow Envelope</Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>

        {/* App */}
        <Separator bordered>
          <Text>APP</Text>
        </Separator>
        <ListItem
          icon
          onPress={() =>
            navigation.navigate('Acknowledgements', {
              backgroundColor: s.header.backgroundColor,
            })
          }>
          <Left>
            <Button>
              <Icon active name="compass" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>Acknowledgements</Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>
        <ListItem icon last>
          <Left>
            <Button>
              <Icon active name="star" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>Version</Text>
          </Body>
          <Right>
            <Text>
              {getVersion()} ({getBuildNumber()})
            </Text>
          </Right>
        </ListItem>

        <Separator bordered />

        <Button block full onPress={_signOut}>
          <Text>Sign out</Text>
        </Button>

        <View style={{ marginTop: 25 }}>
          <Text style={s.footerText}>
            &copy; {new Date().getFullYear()} Envelope
          </Text>
          <Text style={s.footerText}>
            <Text
              onPress={_terms}
              style={{ color: 'blue', marginHorizontal: 10 }}>
              Terms
            </Text>
            {' & '}
            <Text
              onPress={_privacy}
              style={{ color: 'blue', marginHorizontal: 10 }}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </Content>
    </Container>
  );
};

export default Settings;

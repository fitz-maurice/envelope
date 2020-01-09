import React, {useState, useCallback, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Feather';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {View, Platform, TouchableOpacity} from 'react-native';
import {Container, Content, Text, Button, Footer, ListItem, Left, Body, Right, Separator} from 'native-base';

import styles from './styles';
import globals from '../../../config/globals';
import AppContext from '../../../config/context';

const Settings = ({navigation}) => {
  const s = useDynamicStyleSheet(styles);
  const context = useContext(AppContext);

  /**
   * _signOut
   *
   * Sign out of the application and clean it up
   */
  const _signOut = () => {
    auth().signOut();
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
      uri: 'https://jmu.edu/',
    })
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
      uri: 'https://www.wofford.edu/',
    })
  };

  return (
    <Container>
      <Content>

        {/* Settings */}
        <Separator bordered>
          <Text>SETTINGS</Text>
        </Separator>
        <ListItem icon>
          <Body>
            <Text>Full Name</Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>
        <ListItem icon last>
          <Body>
            <Text>Birthday</Text>
          </Body>
          <Right>
            <Icon active name="chevron-right" size={15} />
          </Right>
        </ListItem>

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
        <ListItem icon last>
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
        <ListItem icon>
          <Left>
            <Button>
              <Icon active name="star" color={globals.colors.white} />
            </Button>
          </Left>
          <Body>
            <Text>Rate in the {Platform.OS === 'ios' ? 'App Store' : 'Google Play Store'}</Text>
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
        <ListItem icon>
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
            <Text>1.0.0</Text>
          </Right>
        </ListItem>

        <Separator bordered />

        <Button block full onPress={_signOut}>
          <Text>Sign out</Text>
        </Button>

        <View style={{marginTop: 25}}>
          <Text style={s.footerText}>&copy; {new Date().getFullYear()} Envelope</Text>
          <Text style={s.footerText}>
            <Text onPress={_terms} style={{color: 'blue', marginHorizontal: 10}}>Terms</Text>
            {' & '}
            <Text onPress={_privacy} style={{color: 'blue', marginHorizontal: 10}}>Privacy Policy</Text>
          </Text>
        </View>
      </Content>
    </Container>
  );
};

export default Settings;

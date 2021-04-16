import React, {useCallback, useContext} from 'react';
import {Text, View, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {ThemeContext} from '../../../theme';
import {AuthTitle, Container, Page} from '../../../components';

const Premium = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Premium',
        headerRight: null,
      });
    }, [navigation]),
  );

  // const styles = {};

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} />
      <Container>
        <AuthTitle text="Get More from Envelope" />
      </Container>
    </Page>
  );
};

export {Premium};

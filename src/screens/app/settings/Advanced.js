import React, {useCallback, useContext} from 'react';
import {Text, View, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {ThemeContext} from '../../../theme';
import {Page, Container, PageTitle} from '../../../components';

const Advanced = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Advanced',
        headerRight: null,
      });
    }, [navigation]),
  );

  /***************************************************************
   * STYLES
   **************************************************************/
  // const styles = {};

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} />
      <Container>
        <PageTitle text="Manage Your Account" />
      </Container>
    </Page>
  );
};

export {Advanced};

import React, {useCallback, useContext} from 'react';
import {StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// Envelope
import {ThemeContext} from '../../../theme';
import {PageTitle, Container, Page} from '../../../components';

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

  /***************************************************************
   * STYLES
   **************************************************************/
  // const styles = {};

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} />
      <Container>
        <PageTitle text="Get More from Envelope" />
      </Container>
    </Page>
  );
};

export {Premium};

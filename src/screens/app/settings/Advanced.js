import React, {useContext} from 'react';
import {StatusBar} from 'react-native';

// Envelope
import {ThemeContext} from '../../../theme';
import {Page, Container, PageTitle} from '../../../components';

const Advanced = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

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

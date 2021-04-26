import React, {useContext} from 'react';
import {StatusBar} from 'react-native';

// Envelope
import {ThemeContext} from '../../../theme';
import {PageTitle, Container, Page} from '../../../components';

const Premium = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

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

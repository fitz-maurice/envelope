import React, {useContext} from 'react';
import {Text, StatusBar} from 'react-native';

// Envelope
import {ThemeContext} from '../../theme';
import {Page, Container, Carousel} from '../../components';

const Details = ({route, navigation}) => {
  const {theme} = useContext(ThemeContext);
  const {item} = route.params;

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} animated={true} />
      <Carousel images={item.images} />
      <Container>
        <Text>From: {item.from}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Tag: {item.tag}</Text>
        <Text>Notes: {item.notes}</Text>
      </Container>
    </Page>
  );
};

export {Details};

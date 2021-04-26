import React from 'react';
import {Text, StatusBar} from 'react-native';

// Envelope
import {Page, Container} from '../../components';

const Upload = ({route, navigation}) => {
  const {selected} = route.params;

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <Container>
        <Text>Upload</Text>
        {selected.map(s => (
          <Text>{s}</Text>
        ))}
      </Container>
    </Page>
  );
};

export {Upload};

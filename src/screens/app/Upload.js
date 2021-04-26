import React, {useCallback} from 'react';
import {Text, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// Envelope
import {Page, Container} from '../../components';

const Upload = ({route, navigation}) => {
  const {selected} = route.params;

  // useFocusEffect(
  //   useCallback(() => {
  //     const stackNavigator = navigation.dangerouslyGetParent();

  //     if (stackNavigator) {
  //       stackNavigator.setOptions({
  //         headerLeft: () => <HeaderCamera navigation={navigation} />,
  //         title: 'Envelope',
  //       });
  //     }
  //   }, [navigation]),
  // );

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

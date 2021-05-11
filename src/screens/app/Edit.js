import React, {useEffect} from 'react';
import {Text, StatusBar, Alert} from 'react-native';

// Envelope
import {Page, Container, Button} from '../../components';

const Edit = ({route, navigation}) => {
  const {image} = route.params;
  // const hasUnsavedChanges = Boolean(text);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // if (!hasUnsavedChanges) {
        //   return;
        // }

        e.preventDefault();
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation],
  );

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <Container>
        <Text>{image.from}</Text>
        <Text>{image.tag}</Text>
        <Text>{image.date}</Text>
        <Text>{image.notes}</Text>
      </Container>
      <Container>
        <Button title="Save" onPress={() => Alert.alert('Saving...')} />
      </Container>
    </Page>
  );
};

export {Edit};

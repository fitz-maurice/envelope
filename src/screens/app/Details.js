import React, {useCallback, useContext} from 'react';
import {Text, StatusBar, Image, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// Envelope
import {ThemeContext} from '../../theme';
import {Page, Container, HeaderTitle} from '../../components';

const Details = ({route, navigation}) => {
  const {theme} = useContext(ThemeContext);
  const {item} = route.params;
  const firstImageSize = Dimensions.get('window').width;

  useFocusEffect(
    useCallback(() => {
      // Set header elements on focus
      const stackNavigator = navigation.dangerouslyGetParent();
      if (stackNavigator) {
        stackNavigator.setOptions({
          title: <HeaderTitle text="Card Details" />,
        });
      }
    }, [navigation]),
  );

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} animated={true} />
      <Image
        style={{width: firstImageSize, height: firstImageSize}}
        source={{
          uri: `data:image/png;base64,${item.images[0]}`,
        }}
      />
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

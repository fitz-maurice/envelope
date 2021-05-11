import React, {useContext} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';

// Envelope
import {ThemeContext} from '../../theme';
import {Page, Container, Carousel, Tag} from '../../components';

const Details = ({route, navigation}) => {
  const {theme} = useContext(ThemeContext);
  const {item} = route.params;

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    bold: {fontWeight: 'bold'},
  });

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} animated={true} />
      <Carousel images={item.images} />
      <Tag tag={item.tag} />
      <Container>
        <View style={styles.info}>
          <Text>
            <Text style={styles.bold}>From: </Text> {item.from}
          </Text>
          <Text>{item.date}</Text>
        </View>
        <Text>{item.notes}</Text>
      </Container>
    </Page>
  );
};

export {Details};

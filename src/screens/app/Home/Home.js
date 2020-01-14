import React, { useContext, useState, useCallback } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Content,
  Button,
  Fab,
  ActionSheet,
  Grid,
  Col,
} from 'native-base';

import styles from './styles';
import globals from '../../../config/globals';
import AppContext from '../../../config/context';

// Envelope Components
import Single from '../../../components/Single';

const Home = ({ navigation }) => {
  const context = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    context.wait(2000).then(() => setRefreshing(false));
  }, [context]);

  /**
   * _openCardTypeActionSheet
   *
   * Open the ActionSheet and pass name and image numbers to Upload screen
   */
  const _openCardTypeActionSheet = () => {
    const BUTTONS = ['Single sided', 'Double sided', 'Book style', 'Cancel'];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 3,
        title: 'Select a card type.',
      },
      index => {
        if (index === 3) {
          return;
        }

        navigation.navigate('Upload', {
          name: BUTTONS[index],
          images: index + 1,
        });
      },
    );
  };

  /**
   * _renderSingleLayout
   *
   * Render a scrolling list of single column cards
   */
  const _renderSingleLayout = () => {
    const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const list = cards.map(info => <Single key={info}></Single>);
    return list;
  };

  /**
   * _renderGridLayout
   *
   * Render a 2up grid of cards
   */
  const _renderGridLayout = () => {
    return (
      <Grid>
        <Col style={{ backgroundColor: '#635DB7', height: 200 }}></Col>
        <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>
      </Grid>
    );
  };

  return (
    <Container>
      <Content
        padder
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Layout */}
        {context.layout ? _renderGridLayout() : _renderSingleLayout()}

        {/* Floating Action Button */}
        <Fab
          position="bottomRight"
          style={{ backgroundColor: globals.colors.envelopeRed }}
          onPress={_openCardTypeActionSheet}>
          <Icon name="image" size={20} />
        </Fab>
      </Content>
    </Container>
  );
};

export default Home;

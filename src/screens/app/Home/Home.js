import React, { useContext, useState, useCallback } from 'react';
import { RefreshControl, Platform } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
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
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

import styles from './styles';
import globals from '../../../config/globals';
import AppContext from '../../../config/context';

// Envelope Components
import Single from '../../../components/Single';

const Home = ({ navigation }) => {
  const context = useContext(AppContext);
  const s = useDynamicStyleSheet(styles);
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
          backgroundColor: s.header.backgroundColor,
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
    const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Layout */}
        {context.layout ? _renderGridLayout() : _renderSingleLayout()}
      </Content>

      {/* Floating Action Button */}
      <Fab
        position="bottomRight"
        style={{
          backgroundColor: globals.colors.envelopeRed,
          marginBottom: 50,
        }}
        onPress={_openCardTypeActionSheet}>
        <Icon name="image" size={20} />
      </Fab>

      {/* ADDDSSSSS BABY */}
      <BannerAd
        unitId={
          Platform.OS === 'ios'
            ? 'ca-app-pub-5831491795997988/7495564994'
            : 'ca-app-pub-5831491795997988/7970207715'
        }
        size={BannerAdSize.FULL_BANNER}
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
          console.log('Advert failed to load: ', error);
        }}
      />
    </Container>
  );
};

export default Home;

import React, { useState, useCallback, useContext } from 'react';
import { RefreshControl, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Content,
  Text,
  Button,
  Fab,
  Grid,
  Col,
  Row,
  ActionSheet,
  Thumbnail,
} from 'native-base';

import styles from './styles';
import globals from '../../../config/globals';
import AppContext from '../../../config/context';

const Home = ({ navigation }) => {
  const context = useContext(AppContext);
  const [fab, toggleFab] = useState(false);
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

  return (
    <Container>
      {/* Header */}

      <Content
        padder
        // contentContainerStyle={{}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Grid of Greeting Cards */}
        <Grid>
          <Row>
            <Col>
              <Thumbnail
                large
                source={{ uri: 'https://via.placeholder.com' }}
              />
            </Col>
          </Row>
        </Grid>

        {/* Floating Action Button */}
        <Fab
          active={fab}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={_openCardTypeActionSheet}>
          <Icon name={fab ? 'x' : 'image'} size={20} />
        </Fab>
      </Content>
    </Container>
  );
};

export default Home;

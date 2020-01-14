import React, {useState, useCallback, useContext} from 'react';
import {RefreshControl} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import {Container, Content, Text, Button, Fab, Grid, Col, Row, ActionSheet} from 'native-base';

import styles from './styles';
import AppContext from '../../../config/context';
import Icon from 'react-native-vector-icons/Feather';

const Home = ({navigation}) => {
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
   *
   */
  const _openCardTypeActionSheet = () => {
    const BUTTONS = ['Single sided', 'Double sided', 'Book style', 'Cancel'];
    ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: 3,
      title: 'Select a card type.',
    }, (index) => {
      // Switch statement...
      console.log(`The index: ${index}`);

      navigation.navigate('Upload', { name: BUTTONS[index] });
    });
  };

  return (
    <Container>
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
              <Image source={{uri: 'https://via.placeholder.com/300'}} style={{width: '98%', height: 200}}/>
            </Col>
            <Col>
              <Image source={{uri: 'https://via.placeholder.com/300'}} style={{width: '98%', height: 200}}/>
            </Col>
          </Row>
          <Row style={{marginTop: 10}}>
            <Col>
              <Image source={{uri: 'https://via.placeholder.com/300'}} style={{width: '98%', height: 200}}/>
            </Col>
            <Col>
              <Image source={{uri: 'https://via.placeholder.com/300'}} style={{width: '98%', height: 200}}/>
            </Col>
          </Row>
          <Row style={{marginTop: 10}}>
            <Col>
              <Image source={{uri: 'https://via.placeholder.com/300'}} style={{width: '98%', height: 200}}/>
            </Col>
            <Col>
              <Image source={{uri: 'https://via.placeholder.com/300'}} style={{width: '98%', height: 200}}/>
            </Col>
          </Row>
        </Grid>

        {/* Floating Action Button */}
        <Fab
          active={fab}
          direction="up"
          containerStyle={{ }}
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={_openCardTypeActionSheet}
        >
          <Icon name={fab ? 'x' : 'image'} size={20} />
        </Fab>
      </Content>
    </Container>
  );
};

export default Home;

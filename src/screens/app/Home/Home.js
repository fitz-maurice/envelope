import React, {useState, useCallback, useContext} from 'react';
import {RefreshControl} from 'react-native';
import {Container, Content, Text, Button} from 'native-base';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import globals from '../../../config/globals';
import AppContext from '../../../config/context';

const Home = ({navigation}) => {
  const context = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    context.wait(2000).then(() => setRefreshing(false));
  }, [context]);

  return (
    <Container>
      <Content
        padder
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <Text>Home Screen</Text>

        <Button block onPress={() => auth().signOut()}>
          <Text>Log out</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Home;

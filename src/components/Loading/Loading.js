import React from 'react';
import {View} from 'react-native';
import {Container, Content, Spinner} from 'native-base';

import styles from './styles';

const Loading = () => {
  return (
    <Container style={styles.container}>
      <Content scrollEnabled={false} contentContainerStyle={styles.content}>
        <View style={styles.square}>
          <Spinner color="black" size="small" style={styles.spinner} />
        </View>
      </Content>
    </Container>
  );
};

Loading.navigationOptions = {
  header: null,
};

export default Loading;

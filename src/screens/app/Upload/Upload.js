import React, {useState, useCallback, useContext} from 'react';
import {Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import {Container, Content, Text, Header, Left, Right, Button, Body, Title} from 'native-base';

import styles from './styles';
import AppContext from '../../../config/context';

const Upload = ({navigation}) => {
  const context = useContext(AppContext);

  /**
   * _cancel
   *
   * Cancel the upload process
   */
  const _cancel = () => {
    Alert.alert(
      'Discard Upload',
      'Are you sure you want to discard this upload?',
      [
        {
          text: 'Continue',
        },
        {
          text: 'Discard',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Container style={styles.container}>
      {/* Header */}
      <Header noLeft hasText>
        <Body>
          <Title>Upload</Title>
        </Body>
        <Button transparent onPress={_cancel}>
          <Icon name='x' size={24} />
        </Button>
      </Header>

      {/* Content */}
      <Content padder>
        <Text>Upload Page</Text>
      </Content>
    </Container>
  );
};

export default Upload;

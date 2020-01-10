import React, {useState, useCallback, useContext} from 'react';
import {Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Container, Content, Text, Header, Left, Right, Button, Body, Title} from 'native-base';

import styles from './styles';
import AppContext from '../../../config/context';

const Upload = ({navigation}) => {
  const context = useContext(AppContext);

  const _takePicture = () => {
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    // });

    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {
    //   console.log(image);
    // });

    // ImagePicker.openCropper({
    //   path: '/private/var/mobile/Containers/Data/Application/F640393C-E1D2-4702-A470-26B49F6F899D/tmp/react-native-image-crop-picker/6F6FB312-1B4D-420D-8440-615C0668EBF7.jpg',
    //   width: 200,
    //   height: 200,
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    // });
  };

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

        <Button block onPress={_takePicture}>
          <Text>Take picture</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Upload;

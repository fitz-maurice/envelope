import React, { useState, useCallback, useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
// import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-crop-picker';
import AmazingCropper from 'react-native-amazing-cropper';
import { Alert, View, Image } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import {
  Container,
  Content,
  Text,
  Header,
  Button,
  Body,
  Title,
  Footer,
} from 'native-base';

import styles from './styles';
import globals from '../../../config/globals';
import AppContext from '../../../config/context';
import HeaderTitle from '../../../components/HeaderTitle';

const Upload = ({ navigation }) => {
  const s = useDynamicStyleSheet(styles);
  const context = useContext(AppContext);
  const [mode, setMode] = useState(false);
  const [front, setFront] = useState(null);
  const [frontFinal, setFrontFinal] = useState(null);
  const [back, setBack] = useState(null);
  const pageName = `${navigation.getParam('name')} card`;

  /**
   * _takePicture
   *
   * Open the camera to take a picture
   */
  const _takePicture = () => {
    ImagePicker.openCamera({ cropping: false })
      .then(image => {
        setFront(image.path);
        setMode(true);
        console.log(image.path);
        console.log(front);
      })
      .catch(() => console.log('Canceling the order picker...'));
  };

  /**
   * _selectPicture
   *
   * Open the photo library to take a picture
   */
  const _selectPicture = () => {
    ImagePicker.openPicker({ cropping: false })
      .then(image => {
        setFront(image.path);
        setMode(true);
        console.log(image.path);
        console.log(front);
      })
      .catch(() => console.log('Canceling the order picker...'));
  };

  const _finishCropping = croppedImageUri => {
    console.log(`THE NEW URL: ${croppedImageUri}`);
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

  /**
   * _renderCropper
   *
   * Render the image cropper
   */
  const _renderCropper = () => {
    return (
      <Container style={styles.container}>
        <AmazingCropper
          style={s.cropper}
          imageUri={front}
          onDone={_finishCropping}
          imageWidth={1600}
          imageHeight={2396}
          BORDER_WIDTH={20}
          NOT_SELECTED_AREA_OPACITY={0.3}
          onCancel={() => console.log('Cancelling Image Crop')}
        />
      </Container>
    );
  };

  /**
   * _renderUploadUI
   *
   * Render the upload UI
   */
  const _renderUploadUI = () => {
    return (
      <Container style={styles.container}>
        {/* Header */}
        <Header style={s.header}>
          <Body>
            <HeaderTitle>{pageName}</HeaderTitle>
          </Body>
        </Header>

        {/* Body */}
        <Content padder>
          <View style={s.uploadImageBlock}>
            {front ? (
              <Image source={{ uri: front }} />
            ) : (
              <Icon name="image" size={50} color={globals.colors.blackTrue} />
            )}
          </View>

          {/* Take a picture */}
          <Button block light onPress={_takePicture}>
            <Text>Take picture</Text>
          </Button>

          {/* Select a Picture */}
          <Button
            block
            light
            onPress={_selectPicture}
            style={{ marginTop: 10 }}>
            <Text>Select picture</Text>
          </Button>
        </Content>

        <Footer>
          <Button rounded danger onPress={_cancel} style={{ marginTop: 10 }}>
            <Text>Cancel</Text>
          </Button>

          <Button
            rounded
            onPress={() => alert('Uploading...')}
            style={{ marginTop: 10 }}>
            <Text>Upload</Text>
          </Button>
        </Footer>
      </Container>
    );
  };

  // Render the proper screen...
  return mode ? _renderCropper() : _renderUploadUI();
};

export default Upload;

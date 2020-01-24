import React, { useState, useCallback, useContext } from 'react';
import { Alert, View, Image } from 'react-native';
// import storage from '@react-native-firebase/storage'
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import AmazingCropper from 'react-native-amazing-cropper';
import useStateWithCallback from 'use-state-with-callback';
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
  const pageName = `${navigation.getParam('name')} card`;
  //
  //
  //
  const [isCroppingMode, setCroppingMode] = useState(false);
  //
  //
  //
  const [images, setImages] = useStateWithCallback([], images => {
    console.log('The Images---------------------------');
    console.log(images);
    console.log('The Images---------------------------');
    if (images.length > 0) {
      console.log('Here...');
      setCroppingMode(false);
      console.log('Here...');
    }
  });
  //
  //
  //
  const [scratchImage, setScratchImage] = useStateWithCallback(
    {},
    scratchImage => {
      if (scratchImage.path) {
        setCroppingMode(true);
      }
    },
  );

  const _aaa = image => {
    setScratchImage({
      width: image.width,
      height: image.height,
      path: image.path,
    });
  };

  /**
   * _takePicture
   *
   * Open the camera to take a picture
   */
  const _takePicture = () => {
    ImagePicker.openCamera({ cropping: false })
      .then(_aaa)
      .catch(() => console.log('Canceling the order picker...'));
  };

  /**
   * _selectPicture
   *
   * Open the photo library to take a picture
   */
  const _selectPicture = () => {
    ImagePicker.openPicker({ cropping: false })
      .then(_aaa)
      .catch(() => console.log('Canceling the order picker...'));
  };

  /**
   * _finishCropping
   *
   * Finish cropping an image and save it to the images array
   */
  const _finishCropping = croppedImageUrl => {
    setImages([...images, croppedImageUrl]);
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
          onPress: () => {
            navigation.goBack();
            setImages([]);
          },
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
          onDone={_finishCropping}
          imageUri={scratchImage.path}
          imageWidth={scratchImage.width}
          imageHeight={scratchImage.height}
          BORDER_WIDTH={9}
          NOT_SELECTED_AREA_OPACITY={0.3}
          onCancel={() => {
            console.log('Cancelling Image Crop');
            setCroppingMode(false);
          }}
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
            {images.length > 0 ? (
              <Image
                source={{ uri: images[0] }}
                style={{ width: 100, height: 100 }}
              />
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

        <Footer
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
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
  return isCroppingMode ? _renderCropper() : _renderUploadUI();
};

export default Upload;

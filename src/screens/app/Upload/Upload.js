import React, {useState, useCallback, useContext} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import AmazingCropper from 'react-native-amazing-cropper';
import {Container, Content, Text, Header, Left, Right, Button, Body, Title} from 'native-base';

import styles from './styles';
import AppContext from '../../../config/context';

const Upload = ({navigation}) => {
  const context = useContext(AppContext);
  const [image, setImagePath] = useState(null);
  const pageName = `${navigation.getParam('name')} card`;


  /**
   * _takePicture
   *
   * Open the camera to take a picture
   */
  const _takePicture = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then(image => {
      setImagePath(image.path);
    });
  };

  /**
   * _selectPicture
   *
   * Open the photo library to take a picture
   */
  const _selectPicture = () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      setImagePath(image.path);
    });
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
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          onDone={(croppedImageUri) => console.log('croppedImageUri = ', croppedImageUri)}
          onCancel={() => console.log('cancel')}
          imageUri={image}
          imageWidth={1600}
          imageHeight={2396}
          NOT_SELECTED_AREA_OPACITY={0.3}
          BORDER_WIDTH={20}
        />
      </Container>
    );
  }


  /**
   * _renderUploadUI
   *
   * Render the upload UI
   */
  const _renderUploadUI = () => {
    return (
      <Container style={styles.container}>
        <Header noLeft hasText>
          <Body>
            <Title>{pageName}</Title>
          </Body>
          <Button transparent onPress={_cancel}>
            <Icon name='x' size={24} />
          </Button>
        </Header>
        <Content padder>
          <Button block onPress={_takePicture}>
            <Text>Take picture</Text>
          </Button>

          <Button block onPress={_selectPicture} style={{marginTop: 10}}>
            <Text>Select picture</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  return image ? _renderCropper() : _renderUploadUI();
};

export default Upload;

import React, {useState, useCallback, useContext} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import {Container, Content, Text, Header, Left, Right, Button, Body, Title} from 'native-base';

import styles from './styles';
import AppContext from '../../../config/context';

const Upload = ({navigation}) => {
  const context = useContext(AppContext);
  const [image, setImagePath] = useState(null);

  const _takePicture = () => {
    ImagePicker.openCamera({
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

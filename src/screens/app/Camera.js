import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

// Envelope
import {Page, Loader} from '../../components';

const Camera = ({navigation}) => {
  /**
   * Take a photo and return Base64 string of it
   *
   * @param {RNCamera} camera The React Native Camera
   */
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data);
  };

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      height: '100%',
      width: '100%',
    },
    capture: {
      position: 'absolute',
      bottom: 100,
      zIndex: 100,
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });

  return (
    <Page>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') {
            return <Loader />;
          }

          return (
            <Pressable
              onPress={() => takePicture(camera)}
              style={styles.capture}>
              <Text>Make me an icon</Text>
            </Pressable>
          );
        }}
      </RNCamera>
    </Page>
  );
};

export {Camera};

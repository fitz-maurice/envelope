import React, {useState, useCallback, useContext} from 'react';
import {
  Image,
  View,
  Platform,
  StatusBar,
  Pressable,
  ScrollView,
  Dimensions,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {useFocusEffect} from '@react-navigation/native';

// Envelope
import {ThemeContext} from '../../theme';
import {HeaderCamera, HeaderNext, HeaderTitle} from '../../components';

const Library = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const firstImageSize = Dimensions.get('window').width;

  useFocusEffect(
    useCallback(() => {
      _getPictures();

      // Set header elements on focus
      const stackNavigator = navigation.dangerouslyGetParent();
      if (stackNavigator) {
        stackNavigator.setOptions({
          title: <HeaderTitle text="Library" />,
          headerLeft: () => <HeaderCamera navigation={navigation} />,
          headerRight: () => <HeaderNext navigation={navigation} />,
        });
      }
    }, [_getPictures, navigation]),
  );

  /**
   * _hasAndroidPermission
   *
   * Check if Android phones have permission to write to storage on the phone
   */
  const _hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  /**
   * _getPictures
   *
   * Get pictures from the Camera Roll of the device
   */
  const _getPictures = async () => {
    if (Platform.OS === 'android' && !(await _hasAndroidPermission())) {
      return;
    }

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    }).then(r => {
      let library = r.edges;
      let first = library.shift();
      setPhoto(first);
      setPhotos(library);
    });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={theme.appbar.barStyle} animated={true} />

      {/* First hero image */}
      {photo && (
        <View>
          <Pressable onPress={() => alert('Selected')}>
            <Image
              source={{uri: photo.node.image.uri}}
              style={{width: firstImageSize, height: firstImageSize}}
            />
          </Pressable>
        </View>
      )}

      {/* Everything else */}
      <ScrollView>
        {photos.map((p, i) => {
          return (
            <Image
              key={i}
              style={{width: '100%', height: 100}}
              source={{uri: p.node.image.uri}}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export {Library};

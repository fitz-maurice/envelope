import React, {useState, useCallback, useContext} from 'react';
import {
  Image,
  View,
  Platform,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {useFocusEffect} from '@react-navigation/native';

import {HeaderCamera, HeaderNext, HeaderTitle} from '../../components';
import {ThemeContext} from '../../theme';

const Library = ({navigation}) => {
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const {theme} = useContext(ThemeContext);
  // Set header elements on focus
  useFocusEffect(
    useCallback(() => {
      getPictures();

      const stackNavigator = navigation.dangerouslyGetParent();

      if (stackNavigator) {
        stackNavigator.setOptions({
          title: <HeaderTitle text="Library" />,
          headerLeft: () => <HeaderCamera navigation={navigation} />,
          headerRight: () => <HeaderNext navigation={navigation} />,
        });
      }
    }, [getPictures, navigation]),
  );

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const getPictures = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
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
              style={{
                width: 300,
                height: 100,
              }}
              source={{uri: photo.node.image.uri}}
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

import React, {useState, useCallback} from 'react';
import {
  Image,
  View,
  Platform,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Pressable,
  PermissionsAndroid,
  useColorScheme,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {useFocusEffect} from '@react-navigation/native';

import {HeaderCamera, HeaderNext} from '../../components';
import {colors} from '../../config/colors';

const Library = ({navigation}) => {
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const theme = useColorScheme();
  // Set header elements on focus
  useFocusEffect(
    useCallback(() => {
      getPictures();

      const stackNavigator = navigation.dangerouslyGetParent();

      if (stackNavigator) {
        stackNavigator.setOptions({
          title: 'Library',
          headerLeft: () => <HeaderCamera navigation={navigation} />,
          headerRight: () => <HeaderNext navigation={navigation} />,
          headerTintColor: colors.text(theme),
        });
      }
    }, [getPictures, navigation, theme]),
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
    }).then((r) => {
      let library = r.edges;
      let first = library.shift();
      setPhoto(first);
      setPhotos(library);
    });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={colors.statusBar(theme)} animated={true} />

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

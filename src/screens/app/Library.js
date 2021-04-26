import React, {useState, useCallback, useContext} from 'react';
import {
  Image,
  View,
  Platform,
  StatusBar,
  Pressable,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {useFocusEffect} from '@react-navigation/native';

// Envelope
import {ThemeContext} from '../../theme';
import {Page, HeaderCamera, HeaderNext, HeaderTitle} from '../../components';
import {FlatGrid} from 'react-native-super-grid';

const Library = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos] = useState([]);
  const firstImageSize = Dimensions.get('window').width;
  const imageWidth = Dimensions.get('window').width / 2;

  useFocusEffect(
    useCallback(() => {
      _getPictures();

      // Set header elements on focus
      const stackNavigator = navigation.dangerouslyGetParent();
      if (stackNavigator) {
        stackNavigator.setOptions({
          title: <HeaderTitle text="Library" />,
          headerLeft: () => <HeaderCamera navigation={navigation} />,
          headerRight: () => (
            <HeaderNext navigation={navigation} selected={selectedPhotos} />
          ),
        });
      }
    }, [_getPictures, navigation, selectedPhotos]),
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

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    gridView: {flex: 1},
    cardStyles: {
      width: '100%',
      height: '100%',
    },
    itemContainer: {
      padding: 1,
      height: 150,
      justifyContent: 'flex-end',
      backgroundColor: theme.backgroundColor,
    },
  });

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} animated={true} />

      {/* First hero image */}
      {photo && (
        <View>
          <Pressable onPress={() => selectedPhotos.push(photo.node.image.uri)}>
            <Image
              source={{uri: photo.node.image.uri}}
              style={{width: firstImageSize, height: firstImageSize}}
            />
          </Pressable>
        </View>
      )}

      {/* Everything else */}
      <FlatGrid
        spacing={0}
        data={photos}
        style={styles.gridView}
        itemDimension={imageWidth}
        renderItem={({item}) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => selectedPhotos.push(item.node.image.uri)}>
            <Image
              style={styles.cardStyles}
              source={{uri: item.node.image.uri}}
            />
          </Pressable>
        )}
      />
    </Page>
  );
};

export {Library};

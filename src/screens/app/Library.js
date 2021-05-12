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
import {FlatGrid} from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Feather';

// Envelope
import {ThemeContext} from '../../theme';
import {Page, HeaderCamera, HeaderNext, HeaderTitle} from '../../components';

const Library = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const firstImageSize = Dimensions.get('window').width;
  const imageWidth = Dimensions.get('window').width / 2;

  const toggleSelection = uri => {
    if (!selectedPhotos.includes(uri)) {
      setSelectedPhotos(old => [...old, uri]);
    } else {
      setSelectedPhotos(selectedPhotos.filter(card => card !== uri));
    }
  };

  useFocusEffect(
    useCallback(() => {
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

      if (Platform.OS === 'android' && !_hasAndroidPermission()) {
        return;
      }

      CameraRoll.getPhotos({
        first: 101,
        assetType: 'Photos',
      }).then(r => {
        let library = r.edges;
        let first = library.shift();
        setPhoto(first);
        setPhotos(library);
      });
    }, [navigation, selectedPhotos]),
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
    iconView: {
      margin: 5,
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 15,
      height: 15,
      color: 'white',
      backgroundColor: 'deepskyblue',
      borderRadius: 99,
      borderColor: 'white',
      borderWidth: 1,
    },
    iconOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'black',
      opacity: 0.3,
    },
    largeSelectedContainer: {
      width: firstImageSize,
      height: firstImageSize,
      position: 'absolute',
    },
  });

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} animated={true} />

      {/* First hero image */}
      {photo && (
        <View>
          <Pressable onPress={() => toggleSelection(photo.node.image.uri)}>
            <Image
              source={{uri: photo.node.image.uri}}
              style={{width: firstImageSize, height: firstImageSize}}
            />

            <View style={styles.largeSelectedContainer}>
              {selectedPhotos.includes(photo.node.image.uri) && (
                <>
                  <View
                    style={{
                      ...styles.iconOverlay,
                      width: firstImageSize,
                      height: firstImageSize,
                    }}
                  />
                  <View style={styles.iconView}>
                    <Icon size={13} name="check" color="white" />
                  </View>
                </>
              )}
            </View>
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
            onPress={() => toggleSelection(item.node.image.uri)}>
            <Image
              style={styles.cardStyles}
              source={{uri: item.node.image.uri}}
            />

            <View style={{width: '100%', height: '100%', position: 'absolute'}}>
              {selectedPhotos.includes(item.node.image.uri) && (
                <>
                  <View
                    style={{
                      ...styles.iconOverlay,
                      height: '100%',
                      width: '100%',
                    }}
                  />
                  <View style={styles.iconView}>
                    <Icon size={13} name="check" color="white" />
                  </View>
                </>
              )}
            </View>
          </Pressable>
        )}
      />
    </Page>
  );
};

export {Library};

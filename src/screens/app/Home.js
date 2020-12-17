import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, View, StatusBar, StyleSheet, PlatformColor} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {FlatGrid} from 'react-native-super-grid';
import {Dimensions} from 'react-native';
import {HeaderCamera} from '../../components';

import {AppContext} from '../../services';

const Home = ({navigation}) => {
  const context = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const imageWidth = Dimensions.get('window').width / 2;

  // Set header elements on focus
  useFocusEffect(
    useCallback(() => {
      const stackNavigator = navigation.dangerouslyGetParent();

      if (stackNavigator) {
        stackNavigator.setOptions({
          title: 'Envelope',
          headerLeft: () => <HeaderCamera navigation={navigation} />,
          headerRight: null,
        });
      }
    }, [navigation]),
  );

  useEffect(() => {
    if (context.userRestored) {
      context.setLoading(true);
      const uid = context.user.user.uid;
      const subscriber = firestore()
        .collection(`${uid}/account/cards`)
        .onSnapshot((querySnapshot) => {
          const c = [];
          querySnapshot.forEach((documentSnapshot) => {
            c.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setCards(c);
          context.setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
  }, [context.userRestored]);

  // Has User data been rehydrated into the context
  if (!context.userRestored) {
    return null;
  }

  const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
    },
    gridView: {
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      height: 150,
      backgroundColor: PlatformColor('systemBackground'),
      padding: 1,
    },
    cardStyles: {width: '100%', height: '100%'},
  });

  return (
    <View style={styles.viewStyle}>
      <StatusBar barStyle="dark-content" />
      <FlatGrid
        itemDimension={imageWidth}
        spacing={0}
        data={cards}
        style={styles.gridView}
        renderItem={({item}) => (
          <View style={[styles.itemContainer]}>
            <Image
              style={styles.cardStyles}
              source={{
                uri: `data:image/png;base64,${item.images[0]}`,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export {Home};

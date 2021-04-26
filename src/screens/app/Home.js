import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, View, StatusBar, StyleSheet, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {FlatGrid} from 'react-native-super-grid';

// Envelope
import {ThemeContext} from '../../theme';
import {AppContext} from '../../services';
import {HeaderCamera, HeaderTitle, Page} from '../../components';

const Home = ({navigation}) => {
  const context = useContext(AppContext);
  const {theme} = useContext(ThemeContext);
  const [cards, setCards] = useState([]);
  const imageWidth = Dimensions.get('window').width / 2;

  useFocusEffect(
    useCallback(() => {
      // Set header elements on focus
      const stackNavigator = navigation.dangerouslyGetParent();
      if (stackNavigator) {
        stackNavigator.setOptions({
          title: <HeaderTitle text="Envelope" />,
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
      console.log('Hi');
      const subscriber = firestore()
        .collection(`${uid}/account/cards`)
        .onSnapshot(querySnapshot => {
          const c = [];
          if (querySnapshot) {
            console.log('Hi m');
            querySnapshot.forEach(documentSnapshot => {
              c.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setCards(c);
          }
          context.setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [context.userRestored]);

  // Has User data been rehydrated into the context
  if (!context.userRestored) {
    return null;
  }

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
    </Page>
  );
};

export {Home};

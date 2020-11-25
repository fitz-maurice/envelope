import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, StatusBar, Image, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {HeaderCamera} from '../../components';

import {AppContext} from '../../services';

const Home = ({navigation}) => {
  const context = useContext(AppContext);
  const [cards, setCards] = useState([]);

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
    // if (context.userRestored) {
    //   context.setLoading(true);
    //   const uid = context.user.user.uid;
    //   const subscriber = firestore()
    //     .collection(`${uid}/account/cards`)
    //     .onSnapshot((querySnapshot) => {
    //       const c = [];
    //       querySnapshot.forEach((documentSnapshot) => {
    //         c.push({
    //           ...documentSnapshot.data(),
    //           key: documentSnapshot.id,
    //         });
    //       });
    //       setCards(c);
    //       context.setLoading(false);
    //     });
    //   // Unsubscribe from events when no longer in use
    //   return () => subscriber();
    // }
  }, [context.userRestored]);

  // Has User data been rehydrated into the context
  if (!context.userRestored) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {cards.length > 0 &&
          cards.map((card) => (
            <Image
              key={card.key}
              style={{width: '100%', height: 100}}
              source={{
                uri: `data:image/png;base64,${card.images[0]}`,
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export {Home};

import React, {useCallback} from 'react';
import {FlatList, Pressable, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Envelope
import {Page, HeaderAdd} from '../../components';

const Picker = ({route, navigation}) => {
  const {list, title} = route.params;
  const items = list.map((v, i) => {
    return {
      id: i,
      value: v,
    };
  });

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title,
        headerRight: () => {
          if (title === 'Pick Contact') {
            return <HeaderAdd navigation={navigation} people={items} />;
          }
        },
      });
    }, [title, navigation, items]),
  );

  /**
   * _item
   *
   * Render an item in the list
   */
  const _item = i => (
    <Pressable
      style={styles.item}
      onPress={() => {
        ReactNativeHapticFeedback.trigger('impactLight');
        if (title.includes('Contact')) {
          navigation.navigate('Edit', {newFrom: i.item.value});
        } else {
          navigation.navigate('Edit', {newTag: i.item.value});
        }
      }}>
      <Text>{i.item.value}</Text>
    </Pressable>
  );

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    item: {
      borderBottomWidth: 1,
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  return (
    <Page>
      <FlatList data={Object.values(items)} renderItem={_item} />
    </Page>
  );
};

export {Picker};

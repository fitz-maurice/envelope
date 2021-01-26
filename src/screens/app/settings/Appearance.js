import React, {useCallback} from 'react';
import {Button, View, StatusBar, SectionList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {useThemeColors} from '../../../services';

const Appearance = ({navigation}) => {
  const {colors, changeTheme} = useThemeColors();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Appearance',
        headerRight: null,
        headerStyle: {
          backgroundColor: colors.gray,
        },
        headerTintColor: colors.text,
      });
    }, [navigation, colors]),
  );

  const styles = {
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundColor,
    },
    text: {fontSize: 30, color: 'black'},
  };

  const DATA = [
    {
      data: ['Automatic', 'Light', 'Dark'],
    },
  ];

  return (
    <View style={styles.view}>
      <StatusBar barStyle={colors.statusBar} />
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <Button
            title={item}
            onPress={() => changeTheme(item.toLowerCase())}
          />
        )}
      />
    </View>
  );
};

export {Appearance};

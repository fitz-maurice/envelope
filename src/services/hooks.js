import {useState, useMemo, useEffect, useCallback} from 'react';
import {useSubscription} from 'use-subscription';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {
  generateColors,
  addChangeListener,
  removeChangeListener,
} from '../config/colors';

export function useThemeColors() {
  const [userChoice, setUserChoice] = useState('automatic');
  const {getItem, setItem} = useAsyncStorage('@theme');
  const currentTheme = useColorScheme();

  const getUserChoice = async () => {
    const item = await getItem();
    setUserChoice(item);
  };

  const changeTheme = async (value) => {
    await setItem(value);
    setUserChoice(value);
  };

  useEffect(() => {
    getUserChoice();
  });

  const subscription = useMemo(() => {
    return {
      getCurrentValue: () => generateColors(currentTheme, userChoice),
      subscribe: (callback) => {
        addChangeListener(callback);
        return () => removeChangeListener(callback);
      },
    };
  }, [currentTheme, userChoice]);

  return {
    colors: useSubscription(subscription),
    changeTheme,
  };
}

import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * useAsyncStorage - Hook for AsyncStorage functions for one specific key
 *
 * @returns [{data, error, loading}, getItem, setItem, removeItem]
 */
const useAsyncStorage = (key) => {
  const [data, setStorage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let cancel = false;

  // Set an item in storage
  const setItem = async (value) => {
    if (typeof value === 'string') {
      setLoading(true);
      try {
        await AsyncStorage.setItem(`@${key}`, value);
        setStorage(value);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    } else {
      setError('AsyncStorage Error: setItem value not a string');
    }
  };

  // Get an item from storage
  const getItem = async () => {
    cancel = false;
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem(`@${key}`);

      if (cancel) {
        return;
      }

      setStorage(value);
      setLoading(false);
    } catch (e) {
      if (cancel) {
        return;
      }

      setError(e);
      setLoading(false);
    }
  };

  // Remove an item from storage
  const removeItem = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem(key);
      setStorage(null);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  // Kick off the hook
  useEffect(() => {
    getItem();
    return () => {
      cancel = true;
    };
  }, []);

  return [{data, error, loading}, setItem, removeItem, getItem];
};

const useAsyncStorageJson = (key) => {
  const [dataObj, setItem, removeItem] = useAsyncStorage(key);
  const {loading, error, data} = dataObj;
  const parsedData = data ? JSON.parse(data) : data;

  return [{data: parsedData, error, loading}, setItem, removeItem];
};

export {useAsyncStorage, useAsyncStorageJson};

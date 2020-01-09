import React, {useEffect} from 'react';
// import auth from '@react-native-firebase/auth';
import {Container, Spinner, Text} from 'native-base';
import {useDynamicStyleSheet, useDynamicValue} from 'react-native-dark-mode';

// Styles
import styles from './styles';

const Bootstrap = ({navigation}) => {
  const s = useDynamicStyleSheet(styles);
  const spinner = useDynamicValue('black', 'white');

  /**
   * Listen for any auth state changes and return correct navigator
   */
  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(user => {
      navigation.navigate('Auth');
      // navigation.navigate('App');
      // navigation.navigate(user ? 'App' : 'Auth');
    // });
    // return subscriber;
  }, [navigation]);

  return (
    <Container style={s.container}>
      <Spinner color={spinner} />
    </Container>
  );
};

export default Bootstrap;

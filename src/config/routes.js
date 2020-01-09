import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

// Globals & Components
import globals from './globals';

// Auth screens
import Welcome from '../screens/auth/Welcome';
import Bootstrap from '../screens/auth/Bootstrap';
import SignUpEmail from '../screens/auth/SignUpEmail';
import SignInEmail from '../screens/auth/SignInEmail';
import ResetPassword from '../screens/auth/ResetPassword';

// App screens
import Home from '../screens/app/Home';

/********************************************
 * Auth Stack
 *******************************************/
const AuthStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerShown: false,
    }
  },
  SignUpEmail: {
    screen: SignUpEmail,
  },
  SignInEmail: {
    screen: SignInEmail,
  },
  ResetPassword: {
    screen: ResetPassword,
  },
});

/********************************************
 * Envelope App Container
 *******************************************/
export const Envelope = createAppContainer(
  createSwitchNavigator(
    {
      Bootstrap: Bootstrap,
      Auth: AuthStack,
      App: Home,
    },
    {
      initialRouteName: 'Bootstrap',
    },
  ),
);

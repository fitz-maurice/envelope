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
      headerBackTitle: null,
      headerTintColor: globals.colors.blackTrue,
    }
  },
  SignUpEmail: {
    screen: SignUpEmail,
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: globals.colors.blackTrue, // ! TODO - This needs to by a dynamic color
      headerTitle: 'Sign Up',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    }
  },
  SignInEmail: {
    screen: SignInEmail,
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: globals.colors.blackTrue, // ! TODO - This needs to by a dynamic color
      headerTitle: 'Sign In',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    }
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: globals.colors.blackTrue, // ! TODO - This needs to by a dynamic color
      headerTitle: 'Reset Password',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    }
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

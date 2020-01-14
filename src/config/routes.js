import React from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Globals & Components
import globals from './globals';
import EHeader from '../components/Header';

// Auth screens
import Welcome from '../screens/auth/Welcome';
import Bootstrap from '../screens/auth/Bootstrap';
import SignUpEmail from '../screens/auth/SignUpEmail';
import SignInEmail from '../screens/auth/SignInEmail';
import ResetPassword from '../screens/auth/ResetPassword';

// App screens
import Home from '../screens/app/Home';
import Upload from '../screens/app/Upload';
import WebView from '../screens/app/WebView';
import Settings from '../screens/app/Settings';
import Acknowledgements from '../screens/app/Acknowledgements';

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
    },
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
    },
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
    },
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
    },
  },
});

/********************************************
 * Application Stack
 *******************************************/
const ApplicationStack = createStackNavigator({
  Home: {
    screen: Home,
    headerMode: 'none',
    navigationOptions: {
      header: EHeader,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: 'Account',
      headerLeftContainerStyle: {
        paddingHorizontal: 6,
      },
      headerTitleStyle: {
        color: globals.colors.white,
      },
      headerStyle: {
        backgroundColor: globals.colors.envelopeRed,
      },
      headerLeft: () => (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon size={24} name="chevron-left" color={globals.colors.white} />
        </Button>
      ),
    }),
  },
  WebView: {
    screen: WebView,
    navigationOptions: ({ navigation }) => ({
      headerLeftContainerStyle: {
        paddingHorizontal: 6,
      },
      headerLeft: () => (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon
            size={24}
            name="chevron-left"
            color={globals.colors.blackTrue}
          />
        </Button>
      ),
    }),
  },
  Acknowledgements: {
    screen: Acknowledgements,
    navigationOptions: ({ navigation }) => ({
      headerLeftContainerStyle: {
        paddingHorizontal: 6,
      },
      headerLeft: () => (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon
            size={24}
            name="chevron-left"
            color={globals.colors.blackTrue}
          />
        </Button>
      ),
    }),
  },
});

/********************************************
 * Camera Modal Stack
 *******************************************/
const CameraModalStack = createStackNavigator(
  {
    Home: ApplicationStack,
    Upload: Upload,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

/********************************************
 * Envelope App Container
 *******************************************/
export const Envelope = createAppContainer(
  createSwitchNavigator(
    {
      Bootstrap: Bootstrap,
      Auth: AuthStack,
      App: CameraModalStack,
    },
    {
      initialRouteName: 'Bootstrap',
    },
  ),
);

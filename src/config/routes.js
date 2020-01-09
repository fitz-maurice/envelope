import React from 'react';
import {View} from 'react-native';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
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
import Upload from '../screens/app/Upload';
import WebView from '../screens/app/WebView';
import Settings from '../screens/app/Settings';

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
 * Application Stack
 *******************************************/
const ApplicationStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Envelope',
        headerLeftContainerStyle: {
          paddingHorizontal: 12,
        },
        headerRightContainerStyle: {
          paddingHorizontal: 12,
        },
        headerLeft: () =>
          <View style={{flexDirection: 'row'}}>
            <Button transparent onPress={() => alert('Change view!')}>
              <Icon name="grid" size={20} color={globals.colors.blackTrue} />
            </Button>
            <Button transparent onPress={() => alert('Searching...')} style={{marginLeft: 12}}>
              <Icon name="search" size={20} color={globals.colors.blackTrue} />
            </Button>
          </View>,
        headerRight: () =>
          <Button transparent onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" size={20} color={globals.colors.blackTrue} />
          </Button>,
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        headerLeftContainerStyle: {
          paddingHorizontal: 6,
        },
        title: 'Account',
        headerLeft: () =>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon size={24} name="chevron-left" color={globals.colors.blackTrue} />
          </Button>
        ,
      }),
    },
    WebView: {
      screen: WebView,
      navigationOptions: ({navigation}) => ({
        headerLeftContainerStyle: {
          paddingHorizontal: 6,
        },
        headerLeft: () =>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon size={24} name="chevron-left" color={globals.colors.blackTrue} />
          </Button>
        ,
      }),
    },
  }
);

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

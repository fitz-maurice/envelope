import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Navigators
const Auth = createStackNavigator();

// Screens
import {Welcome, SignUp, ForgotPassword} from '../screens';

const SignedOutNavigator = ({navigation}) => (
  <Auth.Navigator>
    <Auth.Screen
      name="Welcome"
      component={Welcome}
      options={{headerShown: false}}
    />
    <Auth.Screen
      name="SignUp"
      component={SignUp}
      options={{
        title: 'Sign up to Envelope',
        headerBackTitleVisible: false,
        headerTintColor: '#cc0033',
      }}
    />
    <Auth.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        title: 'Password Reset',
        headerBackTitleVisible: false,
        headerTintColor: '#cc0033',
      }}
    />
  </Auth.Navigator>
);

export {SignedOutNavigator};

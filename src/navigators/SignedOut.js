import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../config';

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
        title: 'Register',
        headerBackTitleVisible: false,
        headerTintColor: colors.green,
      }}
    />
    <Auth.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        title: 'Password Reset',
        headerBackTitleVisible: false,
        headerTintColor: colors.green,
      }}
    />
  </Auth.Navigator>
);

export {SignedOutNavigator};

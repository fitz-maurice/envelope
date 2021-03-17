import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ThemeContext} from '../theme';

// Navigators
const Auth = createStackNavigator();

// Screens
import {Welcome, SignUp, ForgotPassword} from '../screens';

const SignedOutNavigator = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  return (
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
          headerTintColor: theme.green,
        }}
      />
      <Auth.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'Password Reset',
          headerBackTitleVisible: false,
          headerTintColor: theme.green,
        }}
      />
    </Auth.Navigator>
  );
};

export {SignedOutNavigator};

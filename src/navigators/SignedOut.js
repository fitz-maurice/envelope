import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useThemeColors} from '../services/hooks';

// Navigators
const Auth = createStackNavigator();

// Screens
import {Welcome, SignUp, ForgotPassword} from '../screens';

const SignedOutNavigator = ({navigation}) => {
  const {colors} = useThemeColors();
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
};

export {SignedOutNavigator};

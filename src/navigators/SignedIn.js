import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Navigators
const SignedIn = createStackNavigator();
import {TabsNavigator} from '../navigators';

// Screens
import {
  // App
  Camera,
  Upload,
  // Settings
  Premium,
  Advanced,
  PersonalInfo,
} from '../screens';

const SignedInNavigator = ({navigation}) => (
  <SignedIn.Navigator>
    <SignedIn.Screen name="Envelope" component={TabsNavigator} />
    <SignedIn.Screen name="Camera" component={Camera} />
    <SignedIn.Screen name="Advanced" component={Advanced} />
    <SignedIn.Screen name="Premium" component={Premium} />
    <SignedIn.Screen name="Upload" component={Upload} />
    <SignedIn.Screen name="PersonalInfo" component={PersonalInfo} />
  </SignedIn.Navigator>
);

export {SignedInNavigator};

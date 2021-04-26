import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const SignedIn = createStackNavigator();
import {ThemeContext} from '../theme';
import {TabsNavigator} from '../navigators';

// Screens
import {
  // App
  Camera,
  Upload,
  Details,
  // Settings
  Premium,
  Advanced,
  PersonalInfo,
} from '../screens';

const SignedInNavigator = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <SignedIn.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: theme.header.tintColor,
        headerStyle: {
          backgroundColor: theme.header.backgroundColor,
        },
      }}>
      <SignedIn.Screen name="Envelope" component={TabsNavigator} />
      <SignedIn.Screen name="Camera" component={Camera} />
      <SignedIn.Screen name="Advanced" component={Advanced} />
      <SignedIn.Screen name="Premium" component={Premium} />
      <SignedIn.Screen name="Upload" component={Upload} />
      <SignedIn.Screen name="Details" component={Details} />
      <SignedIn.Screen name="PersonalInfo" component={PersonalInfo} />
    </SignedIn.Navigator>
  );
};

export {SignedInNavigator};

import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Envelope
const SignedIn = createStackNavigator();
import {ThemeContext} from '../theme';
import {TabsNavigator} from '../navigators';
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
      <SignedIn.Screen name="Upload" component={Upload} />
      <SignedIn.Screen
        name="Premium"
        component={Premium}
        options={{title: 'Premium Envelope'}}
      />
      <SignedIn.Screen
        name="Details"
        component={Details}
        options={{title: 'Card Details'}}
      />
      <SignedIn.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{title: 'Personal Info'}}
      />
    </SignedIn.Navigator>
  );
};

export {SignedInNavigator};

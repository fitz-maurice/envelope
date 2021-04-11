import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Auth = createStackNavigator();
import {ThemeContext} from '../theme';
import {Welcome, Register, PasswordReset} from '../screens';

const SignedOutNavigator = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <Auth.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: theme.header.tintColor,
        headerStyle: {
          backgroundColor: theme.header.backgroundColor,
        },
      }}>
      <Auth.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Auth.Screen name="Register" component={Register} />
      <Auth.Screen name="PasswordReset" component={PasswordReset} />
    </Auth.Navigator>
  );
};

export {SignedOutNavigator};

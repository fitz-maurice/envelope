/**
 * Envelope
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import {
  // App
  Camera,
  Upload,
  // Settings
  Premium,
  Advanced,
  PersonalInfo,
  Appearance,
} from './src/screens';
import {useThemeColors} from './src/services/hooks';

// Components
import {Loader} from './src/components';

// Services
import {AppContext, AppProvider} from './src/services';

// Navigators
import {SignedOutNavigator, TabsNavigator} from './src/navigators';

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const {colors} = useThemeColors();
  const [Colors, setColors] = useState(colors);
  const SignedInNavigator = createStackNavigator();

  // Handle user state changes
  const onAuthStateChanged = (u) => {
    setUser(u);
    if (initializing) {
      setInitializing(false);
    }
  };

  // Firebase watch auth state
  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  });

  // App is bootstrapped, hide splashscreen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // ...
  if (initializing) {
    return <Loader />;
  }

  return (
    <AppProvider>
      <AppContext.Consumer>
        {({loading}) => (
          <>
            {loading && <Loader />}
            <NavigationContainer>
              {/* {context.user ? ( */}
              {user ? (
                <SignedInNavigator.Navigator
                  screenOptions={() => ({
                    headerStyle: {
                      backgroundColor: Colors.gray,
                    },
                    headerTintColor: Colors.text,
                  })}>
                  <SignedInNavigator.Screen
                    name="Envelope"
                    component={TabsNavigator}
                  />
                  <SignedInNavigator.Screen name="Camera" component={Camera} />
                  <SignedInNavigator.Screen
                    name="Appearance"
                    component={Appearance}
                  />
                  <SignedInNavigator.Screen
                    name="Advanced"
                    component={Advanced}
                  />
                  <SignedInNavigator.Screen
                    name="Premium"
                    component={Premium}
                  />
                  <SignedInNavigator.Screen name="Upload" component={Upload} />
                  <SignedInNavigator.Screen
                    name="PersonalInfo"
                    component={PersonalInfo}
                  />
                </SignedInNavigator.Navigator>
              ) : (
                <SignedOutNavigator />
              )}
            </NavigationContainer>
          </>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
}

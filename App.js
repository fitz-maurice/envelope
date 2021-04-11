/**
 * Envelope
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';

// Components
import {Loader} from './src/components';

// Services
import {AppContext, AppProvider} from './src/services';

// Navigators
import {SignedInNavigator, SignedOutNavigator} from './src/navigators';

// Theme
import {ThemeProvider, ThemeContext, lightTheme, darkTheme} from './src/theme';

export default function App() {
  const colorScheme = useColorScheme();
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = u => {
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    // App is bootstrapped, hide splashscreen
    SplashScreen.hide();
    // Firebase watch auth state
    return auth().onAuthStateChanged(onAuthStateChanged);
  });

  // Logging in spinner
  if (initializing) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
      <ThemeContext.Consumer>
        {({theme}) => (
          <AppProvider>
            <AppContext.Consumer>
              {({loading, user}) => (
                <>
                  {loading && <Loader />}
                  <NavigationContainer>
                    {user ? <SignedInNavigator /> : <SignedOutNavigator />}
                  </NavigationContainer>
                </>
              )}
            </AppContext.Consumer>
          </AppProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

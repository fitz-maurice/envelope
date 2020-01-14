import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { useDynamicValue } from 'react-native-dark-mode';

// The Application Container
import { Envelope } from './src/config/routes';

// React Context & Provider
import AppProvider from './src/config/provider';
import AppContext from './src/config/context';

// Loading Indicator
import Loading from './src/components/Loading';

const App = () => {
  /**
   * Listen for bootup, hide Splashscreen
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProvider>
      <AppContext.Consumer>
        {({ loading }) => (
          <Root>
            {loading ? <Loading /> : null}
            <Envelope />
          </Root>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
};

export default App;

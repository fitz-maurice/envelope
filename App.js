import React from 'react';
import 'react-native-gesture-handler';
import { Root } from 'native-base';
import { StatusBar } from 'react-native';
import { useDynamicValue } from 'react-native-dark-mode';

// The Application Container
import { Envelope } from './src/config/routes';

// React Context & Provider
import AppProvider from './src/config/provider';
import AppContext from './src/config/context';

// Loading Indicator
import Loading from './src/components/Loading';

const App = () => {
  const barStyle = useDynamicValue('dark-content', 'light-content');

  return (
    <AppProvider>
      <AppContext.Consumer>
        {({loading}) => (
          <Root>
            <StatusBar barStyle={barStyle} />
            {loading ? <Loading /> : null}
            <Envelope />
          </Root>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
};

export default App;

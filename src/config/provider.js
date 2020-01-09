import React, {useState} from 'react';
import AppContext from './context';

const AppProvider = ({children}) => {
  // Application loading state
  const [loading, _setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        // Wait...
        wait: timeout => {
          return new Promise(resolve => {
            setTimeout(resolve, timeout);
          });
        },
        // Loading
        loading: loading,
        setLoading: _loading => _setLoading(_loading),
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

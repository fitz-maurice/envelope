import React, {createContext, useState} from 'react';
import {usePersistStorage} from 'react-native-use-persist-storage';

// The app's context
const AppContext = createContext();

const AppProvider = ({children}) => {
  // The application user
  const [user, _setUser, userRestored] = usePersistStorage('@user', false);
  // Application loading state
  const [loading, _setLoading] = useState(false);
  // Pending photos to upload
  const [photosToUpload, _setPhotosToUpload] = useState([]);

  return (
    <AppContext.Provider
      value={{
        // Wait...
        wait: timeout => {
          return new Promise(resolve => {
            setTimeout(resolve, timeout);
          });
        },
        // User
        user: user,
        userRestored: userRestored,
        setUser: _user => _setUser(_user),
        clearUser: () => _setUser(null),
        // Loading
        loading: loading,
        setLoading: _loading => _setLoading(_loading),
        // Photos to upload
        photosToUpload: photosToUpload,
        setPhotosToUpload: _photosToUpload =>
          _setPhotosToUpload(_photosToUpload),
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};

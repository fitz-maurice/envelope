import React, {useEffect, useContext, useState} from 'react';
import {Switch} from 'react-native';
import {saveTheme, loadTheme} from '../utils';
import {ThemeContext, lightTheme, darkTheme} from '../theme';

const DarkToggle = () => {
  const {setTheme} = useContext(ThemeContext);
  const [isDarkTheme, toggleDarkTheme] = useState(false);

  useEffect(() => {
    // componentDidMount
    loadTheme()
      .then((themeType) => {
        if (themeType) {
          toggleDarkTheme(themeType === 'dark');
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleSwitch = (state) => {
    toggleDarkTheme(state);
    setTheme(state ? darkTheme : lightTheme); // Change theme globally
    saveTheme(state ? 'dark' : 'light'); // Save theme preference in Async Storage
  };

  return <Switch onValueChange={toggleSwitch} value={isDarkTheme} />;
};

export {DarkToggle};

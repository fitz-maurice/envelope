import React, {useEffect, useContext, useState} from 'react';
import {Switch} from 'react-native';

// Envelope
import {saveTheme, loadTheme} from '../../utils';
import {ThemeContext, lightTheme, darkTheme} from '../../theme';

const DarkToggle = () => {
  const {setTheme} = useContext(ThemeContext);
  const [isDarkTheme, toggleDarkTheme] = useState(false);

  useEffect(() => {
    loadTheme()
      .then(themeType => {
        if (themeType) {
          toggleDarkTheme(themeType === 'dark');
        }
      })
      .catch(error => console.log(error));
  }, []);

  /**
   * _toggleSwitch
   *
   * Toggle between Light and Dark mode
   *
   * @param {*} state
   */
  const _toggleSwitch = state => {
    toggleDarkTheme(state);
    setTheme(state ? darkTheme : lightTheme); // Change theme globally
    saveTheme(state ? 'dark' : 'light'); // Save theme preference in Async Storage
  };

  return <Switch onValueChange={_toggleSwitch} value={isDarkTheme} />;
};

export {DarkToggle};

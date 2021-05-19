import React, {useEffect, useState} from 'react';
import ThemeContext from './ThemeContext';

// Theme
import {loadTheme} from '../utils/storage';
import {lightTheme, darkTheme} from '../theme';

const ThemeProvider = ({theme: defaultTheme, children}) => {
  const [theme, setTheme] = useState(defaultTheme);

  /**
   * _theming
   *
   * if user has saved preference make sure we load it
   */
  const _theming = async () => {
    const _theme = await loadTheme();

    if (_theme) {
      _theme === 'light' ? setTheme(lightTheme) : setTheme(darkTheme);
    }
  };

  useEffect(() => {
    _theming();
  }, [defaultTheme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

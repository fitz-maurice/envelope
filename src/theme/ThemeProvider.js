import React, {useState} from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({theme: defaultTheme, children}) => {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

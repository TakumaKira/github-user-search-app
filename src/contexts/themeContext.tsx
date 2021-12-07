import React, { createContext, useState } from "react";

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
export const ThemeContext = createContext({
  theme: defaultDark ? 'dark' : 'light',
  toggleTheme: () => {}
});

const ThemeWrapper = (props: any) => {
  const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');

  function _toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider
      value={{ theme: theme, toggleTheme: _toggleTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
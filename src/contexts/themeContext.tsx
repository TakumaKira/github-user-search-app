import React from 'react';

export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

const IS_DEFAULT_DARK = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const ThemeContext = React.createContext({
  theme: IS_DEFAULT_DARK ? ThemeType.Dark : ThemeType.Light,
  toggleTheme: () => {}
});

const ThemeWrapper = (props: any) => {
  const [theme, setTheme] = React.useState(IS_DEFAULT_DARK ? ThemeType.Dark : ThemeType.Light);

  function toggleTheme() {
    setTheme(theme === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark);
  }

  return (
    <ThemeContext.Provider
      value={{ theme: theme, toggleTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
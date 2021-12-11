import React from "react";

export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

const defaultDark = process.env.NODE_ENV === 'test' ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
export const ThemeContext = React.createContext({
  theme: defaultDark ? ThemeType.Dark : ThemeType.Light,
  toggleTheme: () => {}
});

const ThemeWrapper = (props: any) => {
  const [theme, setTheme] = React.useState(defaultDark ? ThemeType.Dark : ThemeType.Light);

  function _toggleTheme() {
    setTheme(theme === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark);
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
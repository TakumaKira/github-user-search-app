import React from 'react';
import { title } from '../config.json';
import { ThemeContext } from "../contexts/themeContext";
import styles from './Header.module.sass';
import ThemeToggleButton from "./ThemeToggleButton";

function Header() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={styles.headerContainer}>
      <span
        className={styles.title}
        data-theme={theme}
      >
        {title}
      </span>
      <ThemeToggleButton />
    </div>
  );
}

export default Header;
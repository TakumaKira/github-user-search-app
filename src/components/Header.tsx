import React from 'react';
import { title } from '../config.json';
import { ThemeContext } from '../contexts/ThemeContext';
import styles from './Header.module.sass';
import ThemeToggleButton from './ThemeToggleButton';

function Header() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={styles.headerContainer}>
      <h1
        className={styles.title}
        data-theme={theme}
      >
        {title}
      </h1>
      <ThemeToggleButton />
    </div>
  );
}

export default Header;
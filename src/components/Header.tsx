import React from 'react';
import { title } from '../config.json';
import { ThemeContext } from '../contexts/ThemeContext';
import Text from './common/Text';
import styles from './Header.module.sass';
import ThemeToggleButton from './ThemeToggleButton';

function Header() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <Text
        className={styles.title}
        text={title}
        data-theme={theme}
      />
      <ThemeToggleButton />
    </div>
  );
}

export default Header;
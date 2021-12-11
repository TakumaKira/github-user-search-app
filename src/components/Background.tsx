import React from 'react';
import { ThemeContext } from '../contexts/themeContext';
import styles from './Background.module.sass';

function Background(props: any) {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div
      className={styles.background}
      data-theme={theme}
    >
      {props.children}
    </div>
  );
}

export default Background;
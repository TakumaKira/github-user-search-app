import React from 'react';
import { iconIds } from '../config.json';
import { ThemeContext, ThemeType } from "../contexts/themeContext";
import getIconUrl from '../services/getIcon';
import styles from './ThemeToggleButton.module.sass';

export enum ThemeLabel {
  Light = 'LIGHT',
  Dark = 'DARK'
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      data-theme={theme}
      onClick={toggleTheme}
    >
      <span className={styles.text}>
        {theme === ThemeType.Light ? ThemeLabel.Dark : ThemeLabel.Light}
      </span>
      <svg className={styles.icon}>
        <use xlinkHref={`${getIconUrl(theme === ThemeType.Light ? iconIds.Moon : iconIds.Sun)}`}></use>
      </svg>
    </div>
  );
}

export default ThemeToggleButton;
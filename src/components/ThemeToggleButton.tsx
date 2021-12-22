import React from 'react';
import { iconIds } from '../config.json';
import { ThemeContext, ThemeType } from '../contexts/ThemeContext';
import Icon from './common/Icon';
import Text from './common/Text';
import styles from './ThemeToggleButton.module.sass';

export enum ThemeLabel {
  Light = 'LIGHT',
  Dark = 'DARK'
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button
      className={styles.container}
      data-theme={theme}
      onClick={toggleTheme}
    >
      <Text
        className={styles.text}
        text={theme === ThemeType.Light ? ThemeLabel.Dark : ThemeLabel.Light}
      />
      <Icon
        className={styles.icon}
        iconId={theme === ThemeType.Light ? iconIds.Moon : iconIds.Sun}
      />
    </button>
  );
}

export default ThemeToggleButton;
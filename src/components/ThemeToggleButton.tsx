import React from 'react';
import { iconIds, labels } from '../config.json';
import { ThemeContext, ThemeType } from '../contexts/ThemeContext';
import Icon from './common/Icon';
import Text from './common/Text';
import styles from './ThemeToggleButton.module.sass';

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
        text={theme === ThemeType.Light ? labels.DARK : labels.LIGHT}
      />
      <Icon
        className={styles.icon}
        iconId={theme === ThemeType.Light ? iconIds.Moon : iconIds.Sun}
      />
    </button>
  );
}

export default ThemeToggleButton;
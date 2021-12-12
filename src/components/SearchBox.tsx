import React from 'react';
import { iconIds } from '../config.json';
import { ThemeContext } from '../contexts/ThemeContext';
import getIconUrl from '../services/getIcon';
import styles from './SearchBox.module.sass';

const PLACEHOLDER_LABEL = 'Search GitHub username…';

function SearchBox() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div
      data-theme={theme}
      className={styles.container}
    >
      <svg className={styles.icon}>
        <use xlinkHref={getIconUrl(iconIds.Search)}></use>
      </svg>
      <input
        data-theme={theme}
        className={styles.input}
        type="text"
        placeholder={PLACEHOLDER_LABEL}
      />
      {true && <span className={styles.error}>No results</span>}
      <button className={styles.button}>Search</button>
    </div>
  );
}

export default SearchBox;
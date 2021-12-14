import React, { ChangeEvent } from 'react';
import { iconIds } from '../config.json';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import getIconUrl from '../services/getIcon';
import getUser from '../services/getUser';
import styles from './SearchBox.module.sass';

export const PLACEHOLDER_LABEL = 'Search GitHub username…';
export const NO_RESULTS_LABEL = 'No results';
export const SEARCH_BUTTON_LABEL = 'Search';

function SearchBox() {
  const { theme } = React.useContext(ThemeContext);
  const { setUser } = React.useContext(UserContext);
  const [ searchQuery, setSearchQuery ] = React.useState('');
  const [ notFound, setNotFound ] = React.useState(false);

  const _handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotFound(false);
    setSearchQuery(event.target.value);
  };
  const _handleSearch = () => {
    if (!searchQuery) return;
    getUser(
      searchQuery,
      user => setUser(user),
      error => setNotFound(true)
    );
  };

  return (
    <div
      data-theme={theme}
      className={styles.container}
    >
      <svg
        role="icon"
        className={styles.icon}
      >
        <use xlinkHref={getIconUrl(iconIds.Search)}></use>
      </svg>
      <input
        data-theme={theme}
        className={styles.input}
        type="text"
        placeholder={PLACEHOLDER_LABEL}
        onChange={_handleInputChange}
      />
      {notFound && <span className={styles.error}>{NO_RESULTS_LABEL}</span>}
      <button
        className={styles.button}
        onClick={_handleSearch}
      >
        {SEARCH_BUTTON_LABEL}
      </button>
    </div>
  );
}

export default SearchBox;
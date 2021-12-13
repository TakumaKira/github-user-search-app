import React, { ChangeEvent } from 'react';
import { iconIds } from '../config.json';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import getIconUrl from '../services/getIcon';
import getUser from '../services/getUser';
import styles from './SearchBox.module.sass';

const PLACEHOLDER_LABEL = 'Search GitHub username…';
const NO_RESULTS_LABEL = 'No results';

function SearchBox() {
  const { theme } = React.useContext(ThemeContext);
  const { setUser } = React.useContext(UserContext);
  const [ searchQuery, setSearchQuery ] = React.useState('');
  const [ notFound, setNotFound ] = React.useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotFound(false);
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
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
      <svg className={styles.icon}>
        <use xlinkHref={getIconUrl(iconIds.Search)}></use>
      </svg>
      <input
        data-theme={theme}
        className={styles.input}
        type="text"
        placeholder={PLACEHOLDER_LABEL}
        onChange={handleInputChange}
      />
      {notFound && <span className={styles.error}>{NO_RESULTS_LABEL}</span>}
      <button
        className={styles.button}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBox;
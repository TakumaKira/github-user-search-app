import React, { ChangeEvent } from 'react';
import { iconIds, labels } from '../config.json';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import getUser from '../services/getUser';
import Icon from './common/Icon';
import Text from './common/Text';
import styles from './SearchBox.module.sass';

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
      <Icon
        className={styles.icon}
        iconId={iconIds.Search}
      />
      <input
        data-theme={theme}
        className={styles.input}
        type='text'
        placeholder={labels.PLACEHOLDER_LABEL}
        onChange={_handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && _handleSearch()}
      />
      {notFound &&
        <Text
          className={styles.error}
          text={labels.NO_RESULTS_LABEL}
        />
      }
      <button
        className={styles.button}
        onClick={_handleSearch}
      >
        {labels.SEARCH_BUTTON_LABEL}
      </button>
    </div>
  );
}

export default SearchBox;
import React from 'react';
import backgroundStyles from './components/Background.module.sass';
import Wrapper from './components/common/Wrapper';
import containerStyles from './components/Container.module.sass';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import UserView from './components/UserView';
import { initUser } from './config.json';
import { ThemeContext } from './contexts/ThemeContext';
import { UserContext } from './contexts/UserContext';
import getUser from './services/getUser';

function App() {
  const { theme } = React.useContext(ThemeContext);
  const { setUser } = React.useContext(UserContext);
  
  React.useEffect(() => {
    getUser(
      initUser,
      user => setUser(user),
      error => console.error('Failed to get the initial user.')
    );
  }, []);

  return (
    <Wrapper
      className={backgroundStyles.background}
      data-theme={theme}      
    >
      <Wrapper
        className={containerStyles.container}
      >
        <Header />
        <SearchBox />
        <UserView />
      </Wrapper>
    </Wrapper>
  );
}

export default App;

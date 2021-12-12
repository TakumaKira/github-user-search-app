import React from 'react';
import backgroundStyles from './components/Background.module.sass';
import Wrapper from './components/common/Wrapper';
import containerStyles from './components/Container.module.sass';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import UserView from './components/UserView';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const { theme } = React.useContext(ThemeContext);

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

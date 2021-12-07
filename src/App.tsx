import Background from './components/Background';
import Container from './components/Container';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import UserView from './components/UserView';
import ThemeWrapper from './contexts/themeContext';

function App() {
  return (
    <ThemeWrapper>
      <Background>
        <Container>
          <Header />
          <SearchBox />
          <UserView />
        </Container>
      </Background>
    </ThemeWrapper>
  );
}

export default App;

import ThemeWrapper from './contexts/themeContext';
import Background from './components/Background';
import Container from './components/Container';

function App() {
  return (
    <ThemeWrapper>
      <Background>
        <Container>
          <div>a</div>
          <div>b</div>
          <div>c</div>
        </Container>
      </Background>
    </ThemeWrapper>
  );
}

export default App;

import App from '../App';
import ThemeWrapper from '../contexts/ThemeContext';
import UserWrapper from '../contexts/UserContext';

function ContextsWrapper() {
  return (
    <ThemeWrapper>
      <UserWrapper>
        <App />
      </UserWrapper>
    </ThemeWrapper>
  );
}

export default ContextsWrapper;
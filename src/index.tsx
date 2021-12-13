import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeWrapper from './contexts/ThemeContext';
import UserWrapper from './contexts/UserContext';
import reportWebVitals from './reportWebVitals';
import './index.sass';
import './theme/theme.sass';

ReactDOM.render(
  <React.StrictMode>
    <ThemeWrapper>
      <UserWrapper>
        <App />
      </UserWrapper>
    </ThemeWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

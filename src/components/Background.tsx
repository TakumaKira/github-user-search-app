import { ThemeContext } from '../contexts/themeContext';
import './Background.css';

function Background(props: any) {
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) =>
        <div
          className="background"
          data-theme={theme}
          onClick={toggleTheme}
        >
          {props.children}
        </div>
      }
    </ThemeContext.Consumer>
  );
}

export default Background;
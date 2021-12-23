import { render, screen } from '@testing-library/react';
import React from 'react';
import '../services/matchMedia.dark.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import ThemeWrapper, { ThemeContext, ThemeType } from './ThemeContext';

it(`should provide theme context to child component in default dark is true`, () => {
  const testId = 'a';
  const Child = (): JSX.Element => {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    return(
      <div data-testid={testId} data-theme={theme} onClick={toggleTheme}></div>
    );
  };
  render(<ThemeWrapper><Child /></ThemeWrapper>);
  const div = screen.getByTestId(testId);
  expect(div.getAttribute('data-theme')).toBe(ThemeType.Dark);
  div.click();
  expect(div.getAttribute('data-theme')).toBe(ThemeType.Light);
});

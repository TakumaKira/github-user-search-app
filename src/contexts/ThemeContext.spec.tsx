import { render, screen } from '@testing-library/react';
import React from 'react';
import ThemeWrapper, { ThemeContext, ThemeType } from './ThemeContext';

it(`should provide theme context to child compoent`, () => {
  const testId = 'a';
  const Child = (): JSX.Element => {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    return(
      <div data-testid={testId} data-theme={theme} onClick={toggleTheme}></div>
    );
  };
  render(<ThemeWrapper><Child /></ThemeWrapper>);
  const div = screen.getByTestId(testId);
  expect(div.getAttribute('data-theme')).toBe(ThemeType.Light);
  div.click();
  expect(div.getAttribute('data-theme')).toBe(ThemeType.Dark);
});
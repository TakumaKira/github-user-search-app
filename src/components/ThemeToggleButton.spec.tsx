import { fireEvent, render, screen } from '@testing-library/react';
import '../services/matchMedia.mock'; // Must be imported before the tested file
import { iconIds } from '../config.json';
import ThemeWrapper, { ThemeType } from '../contexts/ThemeContext';
import getIconUrl from '../services/getIconUrl';
import ThemeToggleButton, { ThemeLabel } from './ThemeToggleButton';

it(`should get the current theme from ThemeContext as button's data-theme attribute`, () => {
  render(<ThemeToggleButton />);
  const button = screen.getByRole('button');
  expect(button.getAttribute('data-theme')).not.toBe(null);
});

it(`should render "${ThemeLabel.Dark}" as button label when current theme is ${ThemeType.Light}`, () => {
  render(<ThemeToggleButton />);
  const button = screen.getByRole('button');
  expect(button.getAttribute('data-theme')).toBe(ThemeType.Light);
  const label = screen.getByText(ThemeLabel.Dark);
  expect(label).toBeInTheDocument();
});

it(`should render ${iconIds.Moon} icon when current theme is ${ThemeType.Light}`, () => {
  render(<ThemeToggleButton />);
  const button = screen.getByRole('button');
  expect(button.getAttribute('data-theme')).toBe(ThemeType.Light);
  const icon = screen.getByRole('icon');
  expect(icon).toBeInTheDocument();
  const use = icon.firstChild! as SVGUseElement;
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconIds.Moon));
  // TODO: Needs a check if the SVG is actually rendered
});

it(`should toggle ThemeContext`, () => {
  render(<ThemeWrapper><ThemeToggleButton /></ThemeWrapper>);
  const button = screen.getByRole('button');
  expect(button.getAttribute('data-theme')).toBe(ThemeType.Light);
  fireEvent.click(button);
  expect(button.getAttribute('data-theme')).toBe(ThemeType.Dark);
  fireEvent.click(button);
  expect(button.getAttribute('data-theme')).toBe(ThemeType.Light);
});

it(`should render "${ThemeLabel.Light}" as button label when current theme is ${ThemeType.Dark}`, () => {
  render(<ThemeWrapper><ThemeToggleButton /></ThemeWrapper>);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button.getAttribute('data-theme')).toBe(ThemeType.Dark);
  const label = screen.getByText(ThemeLabel.Light);
  expect(label).toBeInTheDocument();
});

it(`should render ${iconIds.Sun} icon when current theme is ${ThemeType.Dark}`, () => {
  render(<ThemeWrapper><ThemeToggleButton /></ThemeWrapper>);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button.getAttribute('data-theme')).toBe(ThemeType.Dark);
  const icon = screen.getByRole('icon');
  expect(icon).toBeInTheDocument();
  const use = icon.firstChild! as SVGUseElement;
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconIds.Sun));
  // TODO: Needs a check if the SVG is actually rendered
});

import { render, screen } from '@testing-library/react';
import React from 'react';
import '../services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import { labels } from '../config.json';
import { ThemeType } from '../contexts/ThemeContext';
import * as useResponsiveType from '../hooks/useResponsiveType';
import Stat from './Stat';

let realUseContext: <T>(context: React.Context<T>) => T;
let mockUseContext: jest.Mock<any, any>;
const theme = ThemeType.Dark;
beforeEach(() => {
    realUseContext = React.useContext;
    mockUseContext = React.useContext = jest.fn();
    mockUseContext.mockReturnValue({theme});
});
afterEach(() => {
    React.useContext = realUseContext;
});

it(`should render title and value with data-theme attribute`, () => {
  const title = 'a';
  const value = 1;
  render(<Stat title={title} value={value} />);
  const titleElem = screen.getByText(title);
  expect(titleElem).toBeInTheDocument();
  expect(titleElem.getAttribute('data-theme')).toBe(theme);
  const valueElem = screen.getByText(value);
  expect(valueElem).toBeInTheDocument();
  expect(valueElem.getAttribute('data-theme')).toBe(theme);
});

it(`should pass className and data-responsive-type attribute to container`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);
  const className = 'b';
  render(<Stat title={'a'} value={1} className={className} />);
  const container = screen.getByRole('group');
  expect(container.getAttribute('class')?.split(' ')).toContain(className);
  expect(container.getAttribute('data-responsive-type')).toBe(responsiveType);
});

it(`should render "${labels.ZERO}" if value is null`, () => {
  render(<Stat title={'a'} value={null} />);
  const container = screen.getByRole('group');
  expect(container.children[1].textContent).toBe(labels.ZERO);
});

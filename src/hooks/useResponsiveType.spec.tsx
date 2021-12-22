import { render, screen } from '@testing-library/react';
import useResponsiveType, { ResponsiveType } from './useResponsiveType';
import { responsiveBreakPointWidth } from '../config.json';
import { act } from 'react-dom/test-utils';

it(`should return correct ResponsiveType`, () => {
  const testId = 'testid';
  const Component = (): JSX.Element => {
    const responsiveType = useResponsiveType();
    return (<div data-testid={testId} data-responsive-type={responsiveType}></div>)
  }
  render(<Component />);
  const div = screen.getByTestId(testId);
  act(() => {
    window.innerWidth = responsiveBreakPointWidth.mobileTablet - 1;
    window.dispatchEvent(new Event('resize'));
  });
  expect(div.getAttribute('data-responsive-type')).toBe(ResponsiveType.Mobile);
  act(() => {
    window.innerWidth = responsiveBreakPointWidth.mobileTablet;
    window.dispatchEvent(new Event('resize'));
  });
  expect(div.getAttribute('data-responsive-type')).toBe(ResponsiveType.Tablet);
  act(() => {
    window.innerWidth = responsiveBreakPointWidth.tabletDesktop - 1;
    window.dispatchEvent(new Event('resize'));
  });
  expect(div.getAttribute('data-responsive-type')).toBe(ResponsiveType.Tablet);
  act(() => {
    window.innerWidth = responsiveBreakPointWidth.tabletDesktop;
    window.dispatchEvent(new Event('resize'));
  });
  expect(div.getAttribute('data-responsive-type')).toBe(ResponsiveType.Desktop);
});

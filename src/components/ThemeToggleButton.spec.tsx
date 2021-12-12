import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { iconIds } from '../config.json';
import ThemeWrapper, { ThemeType } from '../contexts/ThemeContext';
import getIconUrl from '../services/getIcon';
import ThemeToggleButton, { ThemeLabel } from './ThemeToggleButton';

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container!);
  container = null;
});

it(`should render "${ThemeLabel.Dark}" as button label when current theme is ${ThemeType.Light}`, () => {
  act(() => {
    ReactDOM.render(<ThemeWrapper><ThemeToggleButton /></ThemeWrapper>, container);
  });
  const label = container!.querySelector('.text')!;
  expect(label.textContent).toBe(ThemeLabel.Dark);
});

it(`should render ${iconIds.Moon} icon when current theme is ${ThemeType.Light}`, () => {
  act(() => {
    ReactDOM.render(<ThemeWrapper><ThemeToggleButton /></ThemeWrapper>, container);
  });
  const use = container!.querySelector('.icon')!.firstChild! as SVGUseElement;
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconIds.Moon));
  // TODO: Needs a check if the SVG is actually rendered
});

it(`should render "${ThemeLabel.Light}" as button label when current theme is ${ThemeType.Dark}`, () => {
  act(() => {
    ReactDOM.render(<ThemeWrapper><ThemeToggleButton /></ThemeWrapper>, container);
  });
  const button = container!.querySelector('.container')!;
  const label = container!.querySelector('.text')!;
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe(ThemeLabel.Light);
});

it(`should render ${iconIds.Sun} icon when current theme is ${ThemeType.Dark}`, () => {
  act(() => {
    ReactDOM.render(<ThemeWrapper><ThemeToggleButton /></ThemeWrapper>, container);
  });
  const button = container!.querySelector('.container')!;
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  const use = container!.querySelector('.icon')!.firstChild! as SVGUseElement;
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconIds.Sun));
  // TODO: Needs a check if the SVG is actually rendered
});

import { render, screen } from '@testing-library/react';
import getIconUrl from '../../services/getIconUrl';
import Icon from './Icon';

it(`should render icon with id`, () => {
  const iconId = 'a';
  render(<Icon iconId={iconId} />);
  const icon = screen.getByRole('img');
  expect(icon).toBeInTheDocument();
  const use = icon.firstChild! as SVGUseElement;
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconId));
  // TODO: Needs a check if the SVG is actually rendered
});

it(`should pass className prop to inside SVG`, () => {
  const className = 'a';
  render(<Icon iconId='id' className={className} />);
  const svg = screen.getByRole('img');
  expect(svg.getAttribute('class')?.split(' ')).toContain(className);
});

it(`should not add class "undefined" to inside SVG if passed class name is undefined`, () => {
  render(<Icon iconId='id' />);
  const svg = screen.getByRole('img');
  expect(svg.getAttribute('class')?.split(' ')).not.toContain('undefined');
});

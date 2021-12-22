import { render, screen } from '@testing-library/react';
import { iconIds } from '../../config.json';
import getIconUrl from '../../services/getIconUrl';
import Icon from './Icon';

it(`should render ${iconIds.Search} icon`, () => {
  const iconId = 'a';
  render(<Icon iconId={iconId} />);
  const icon = screen.getByRole('icon');
  expect(icon).toBeInTheDocument();
  const use = icon.firstChild! as SVGUseElement;
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconId));
  // TODO: Needs a check if the SVG is actually rendered
});

it(`should pass className prop to inside SVG`, () => {
  const className = 'a';
  render(<Icon iconId='id' className={className} />);
  const svg = screen.getByRole('icon');
  expect(svg.getAttribute('class')).toBe(className);
});

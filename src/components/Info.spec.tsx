import { render, screen } from '@testing-library/react';
import { labels } from '../config.json';
import getIconUrl from '../services/getIconUrl';
import Info from './Info';
import styles from './Info.module.sass';

it(`should render icon and info`, () => {
  const iconId = 'a';
  const info = 'b';
  render(<Info iconId={iconId} info={info} />);
  const icon = screen.getByRole('img');
  expect(icon).toBeInTheDocument();
  const use = icon.firstChild! as SVGUseElement;
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconId));
  // TODO: Needs a check if the SVG is actually rendered
  const text = screen.getByText(info);
  expect(text).toBeInTheDocument();
});

it(`should render ${labels.NOT_AVAILABLE} if info is null`, () => {
  const iconId = 'a';
  render(<Info iconId={iconId} info={null} />);
  const text = screen.getByText(labels.NOT_AVAILABLE);
  expect(text).toBeInTheDocument();
});

it(`should render ${labels.NOT_AVAILABLE} if info is empty string`, () => {
  const iconId = 'a';
  render(<Info iconId={iconId} info={''} />);
  const text = screen.getByText(labels.NOT_AVAILABLE);
  expect(text).toBeInTheDocument();
});

it(`should add diabled style if info is null`, () => {
  const iconId = 'a';
  render(<Info iconId={iconId} info={null} />);
  const container = screen.getByRole('group');
  expect(container.getAttribute('class')?.split(' ')).toContain(styles.disabled);
});

it(`should add diabled style if info is empty string`, () => {
  const iconId = 'a';
  render(<Info iconId={iconId} info={''} />);
  const container = screen.getByRole('group');
  expect(container.getAttribute('class')?.split(' ')).toContain(styles.disabled);
});

it(`should have link if linkUrl provided`, () => {
  const info = 'b';
  const linkUrl = 'c';
  render(<Info iconId={'a'} info={info} linkUrl={linkUrl} />);
  const text = screen.getByText(info);
  expect(text.getAttribute('href')).toBe(linkUrl);
});

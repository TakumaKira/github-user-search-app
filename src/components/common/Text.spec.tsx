import { render, screen } from '@testing-library/react';
import Text from './Text';

it(`should render text with passed props`, () => {
  const text = 'a';
  const className = 'b';
  const otherProp = 'c';
  render(<Text text={text} className={className} data-a={otherProp} />);
  const textElem = screen.getByText(text);
  expect(textElem).toBeInTheDocument();
  expect(textElem.getAttribute('class')?.split(' ')).toContain(className);
  expect(textElem.getAttribute('data-a')).toBe(otherProp);
});

it(`should render text with link with passed props`, () => {
  const text = 'a';
  const className = 'b';
  const otherProp = 'c';
  const linkUrl = 'd';
  render(<Text text={text} linkUrl={linkUrl} className={className} data-a={otherProp} />);
  const textElem = screen.getByText(text);
  expect(textElem).toBeInTheDocument();
  expect(textElem.getAttribute('class')?.split(' ')).toContain(className);
  expect(textElem.getAttribute('data-a')).toBe(otherProp);
  expect(textElem.getAttribute('href')).toBe(linkUrl);
});

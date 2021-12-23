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

it(`should not add class "undefined" to span if passed class name is undefined`, () => {
  const text = 'a';
  render(<Text text={text} />);
  const textElem = screen.getByText(text);
  expect(textElem.getAttribute('class')?.split(' ')).not.toContain('undefined');
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

it(`should not add class "undefined" to anchor if passed class name is undefined`, () => {
  const text = 'a';
  render(<Text text={text} linkUrl='b' />);
  const textElem = screen.getByText(text);
  expect(textElem.getAttribute('class')?.split(' ')).not.toContain('undefined');
});

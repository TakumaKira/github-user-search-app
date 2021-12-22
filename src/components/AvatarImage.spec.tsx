import { render, screen } from '@testing-library/react';
import AvatarImage from './AvatarImage';

it(`should render image with passed src`, () => {
  const src = 'a';
  render(<AvatarImage src={src} size={16} />);
  const image = screen.getByRole('img');
  expect(image).toBeInTheDocument();
  expect(image.getAttribute('src')).toBe(src);
});

it(`should render wrapper with passed size and className`, () => {
  const size = 16;
  const className = 'b';
  render(<AvatarImage src={'a'} size={size} className={className} />);
  const wrapper = screen.getByRole('group');
  expect(wrapper.style.width).toBe(`${size}px`);
  expect(wrapper.style.height).toBe(`${size}px`);
  expect(wrapper.getAttribute('class')?.split(' ')).toContain(className);
});

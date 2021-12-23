
import { render, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import '../services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import { title } from '../config.json';
import Header from './Header';
import ThemeToggleButton from './ThemeToggleButton';

it(`should render "${title}"`, () => {
  render(<Header />);
  const titleElem = screen.getByText(title);
  expect(titleElem).toBeInTheDocument();
});

it('should render ThemeToggleButton component', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Header />);
  const result = renderer.getRenderOutput();
  expect(result.props.children).toContainEqual(
    <ThemeToggleButton />
  );
});
import { render } from '@testing-library/react';
import '../services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import ContextsWrapper from './ContextsWrapper';

it(`should render App component`, () => {
  render(<ContextsWrapper />)
});

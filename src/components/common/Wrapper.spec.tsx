import { render, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Wrapper from './Wrapper';

it(`should render child component`, () => {
  const Child = (): JSX.Element => <div></div>;
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Wrapper><Child /></Wrapper>);
  const result = renderer.getRenderOutput();
  expect(result.props.children).toEqual(<Child />);
});

it(`should pass props to inside div`, () => {
  const attrName = 'a';
  const attrValue = 'b';
  const Child = (): JSX.Element => <div></div>;
  render(<Wrapper {...{ [attrName]: attrValue }}><Child /></Wrapper>);
  const div = screen.getByRole('group');
  expect(div.getAttribute(attrName)).toBe(attrValue);
});

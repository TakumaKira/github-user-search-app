import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Wrapper from './Wrapper';

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container!);
  container = null;
});

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
  act(() => {
    ReactDOM.render(<Wrapper {...{ [attrName]: attrValue }}><Child /></Wrapper>, container);
  });
  const div = container!.querySelector('div')!;
  expect(div.getAttribute(attrName)).toBe(attrValue);
});

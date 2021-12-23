import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '../services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import { iconIds } from '../config.json';
import UserWrapper, { UserContext } from '../contexts/UserContext';
import getIconUrl from '../services/getIconUrl';
import getUser from '../services/getUser';
import { nullUser } from '../interfaces/user';
import SearchBox, { NO_RESULTS_LABEL, PLACEHOLDER_LABEL, SEARCH_BUTTON_LABEL } from './SearchBox';

jest.mock('../services/getUser', () => jest.fn());

it(`should render ${iconIds.Search} icon`, () => {
  render(<SearchBox />);
  const icon = screen.getByRole('icon');
  expect(icon).toBeInTheDocument();
  const use = icon.firstChild! as SVGUseElement;
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconIds.Search));
  // TODO: Needs a check if the SVG is actually rendered
});

it(`should render text input with placeholder "${PLACEHOLDER_LABEL}"`, () => {
  render(<SearchBox />);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  expect(input).toBeInTheDocument();
  expect(input.placeholder).toBe(PLACEHOLDER_LABEL);
});

it(`should render search button`, () => {
  render(<SearchBox />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button.textContent).toBe(SEARCH_BUTTON_LABEL);
});

it(`should start searching when inputting some string then enter`, () => {
  render(<SearchBox />);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  userEvent.type(input, '{enter}');
  expect(getUser).not.toHaveBeenCalled();
  userEvent.type(input, 'a{enter}');
  expect(getUser).toHaveBeenCalled();
});

it(`should render "${NO_RESULTS_LABEL}" only right after search result is not found`, () => {
  const mockGetUser = (username: string, onSuccess: (user: any) => void, onError: (error: Error) => void) => {
    onError(new Error('test'));
  };
  (getUser as jest.Mock<any, any>).mockImplementation(mockGetUser);
  render(<SearchBox />);

  const noInputDefault = screen.queryByText(NO_RESULTS_LABEL);
  expect(noInputDefault).toBeNull();

  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, {target: {value: 'a'}});
  const noInputBeforeNotFound = screen.queryByText(NO_RESULTS_LABEL);
  expect(noInputBeforeNotFound).toBeNull();

  const button = screen.getByRole('button');
  fireEvent.click(button);
  const noInputAfterNotFound = screen.queryByText(NO_RESULTS_LABEL);
  expect(noInputAfterNotFound).toBeInTheDocument();

  fireEvent.change(input, {target: {value: 'b'}});
  const noInputAfterInputChanged = screen.queryByText(NO_RESULTS_LABEL);
  expect(noInputAfterInputChanged).toBeNull();
});

it(`should set new user to the context only when found`, () => {
  enum UserNames {
    SUCCESS = 'success',
    FAIL = 'fail',
  };
  const user = { id: 'a' };
  const mockGetUser = (username: UserNames, onSuccess: (user: any) => void, onError: (error: Error) => void) => {
    if (username === UserNames.SUCCESS) {
      onSuccess(user);
    } else {
      onError(new Error('test'));
    }
  };
  (getUser as jest.Mock<any, any>).mockImplementation(mockGetUser);
  const Inter = (props: any): JSX.Element => {
    const { user } = React.useContext(UserContext);
    return (<><div>{props.children}</div><span data-testid='user'>{JSON.stringify(user)}</span></>);
  }
  render(<UserWrapper><Inter><SearchBox /></Inter></UserWrapper>);

  const resultElem = screen.getByTestId('user') as HTMLSpanElement;
  expect(resultElem.textContent).toBe(JSON.stringify(nullUser));

  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, {target: {value: UserNames.FAIL}});
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(resultElem.textContent).toBe(JSON.stringify(nullUser));

  fireEvent.change(input, {target: {value: UserNames.SUCCESS}});
  fireEvent.click(button);
  expect(resultElem.textContent).toBe(JSON.stringify(user));
});

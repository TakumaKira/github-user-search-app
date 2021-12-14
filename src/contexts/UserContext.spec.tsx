import { render, screen } from '@testing-library/react';
import React from 'react';
import UserWrapper, { UserContext } from './UserContext';

it(`should provide theme context to child compoent`, () => {
  const testId = 'a';
  const oldUser = { id: '1' };
  const newUser = { id: '2' };
  const Child = (): JSX.Element => {
    const { user, setUser } = React.useContext(UserContext);
    React.useEffect(() => {
      setUser(oldUser);
    }, []);
    return(
      <div data-testid={testId} onClick={() => setUser(newUser)}>{JSON.stringify(user)}</div>
    );
  };
  render(<UserWrapper><Child /></UserWrapper>);
  const div = screen.getByTestId(testId);
  expect(div.textContent).toBe(JSON.stringify(oldUser));
  div.click();
  expect(div.textContent).toBe(JSON.stringify(newUser));
});

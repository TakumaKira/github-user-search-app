import { render, screen } from '@testing-library/react';
import React from 'react';
import UserWrapper, { UserContext } from './UserContext';

it(`should provide theme context to child compoent`, () => {
  const testId = 'a';
  const oldUser = {
    avatarUrl: 'avatarUrl1',
    name: 'name1',
    username: 'username1',
    joinedDate: new Date(1),
    bio: 'bio1',
    repos: 1,
    followers: 1,
    following: 1,
    location: 'location1',
    blogUrl: 'blogUrl1',
    twitterUsername: 'twitterUsername1',
    company: 'company1',  
  };
  const newUser = {
    avatarUrl: 'avatarUrl2',
    name: 'name2',
    username: 'username2',
    joinedDate: new Date(2),
    bio: 'bio2',
    repos: 2,
    followers: 2,
    following: 2,
    location: 'location2',
    blogUrl: 'blogUrl2',
    twitterUsername: 'twitterUsername2',
    company: 'company2',  
  };
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

import User from '../interfaces/user';
import convertDataToUser from './convertDataToUser';
import { getMessage } from './warnLackOfProp';

it(`should return valid User object without warning if passed valid data`, () => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  const avatarUrl = 'avatarUrl';
  const name = 'name';
  const username = 'username';
  const joinedDate = new Date(0);
  const bio = 'bio';
  const repos = 1;
  const followers = 2;
  const following = 3;
  const location = 'location';
  const blogUrl = 'blogUrl';
  const twitterUsername = 'twitterUsername';
  const company = 'company';
  const userRaw = {
    avatar_url: avatarUrl,
    name: name,
    login: username,
    created_at: joinedDate,
    bio: bio,
    public_repos: repos,
    followers: followers,
    following: following,
    location: location,
    blog: blogUrl,
    twitter_username: twitterUsername,
    company: company,
  }
  const user: User = {
    avatarUrl,
    name,
    username,
    joinedDate,
    bio,
    repos,
    followers,
    following,
    location,
    blogUrl,
    twitterUsername,
    company
  };
  expect(convertDataToUser(userRaw)).toEqual(user);
  expect(console.warn).not.toHaveBeenCalled();
});


it(`should return valid User object with warning if passed invalid data`, () => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  const avatarUrl = 'avatarUrl';
  const name = 'name';
  const username = 'username';
  const joinedDate = new Date(0);
  const bio = 'bio';
  const repos = 1;
  const followers = 2;
  const following = 3;
  const location = 'location';
  const blogUrl = 'blogUrl';
  const twitterUsername = 'twitterUsername';
  const userRaw = {
    avatar_url: avatarUrl,
    name: name,
    login: username,
    created_at: joinedDate,
    bio: bio,
    public_repos: repos,
    followers: followers,
    following: following,
    location: location,
    blog: blogUrl,
    twitter_username: twitterUsername,
  }
  const user: User = {
    avatarUrl,
    name,
    username,
    joinedDate,
    bio,
    repos,
    followers,
    following,
    location,
    blogUrl,
    twitterUsername,
    company: null,
  };
  expect(convertDataToUser(userRaw)).toEqual(user);
  expect(console.warn).toHaveBeenCalledWith(getMessage('company'));
});

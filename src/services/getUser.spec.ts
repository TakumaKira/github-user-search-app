import { AxiosError, AxiosResponse } from 'axios';
import { nullUser } from '../interfaces/user';
import getUser from './getUser';
import * as http from './http';

it(`should call success callback when the result is not an error object`, async () => {
  const nullUserRaw = {
    avatar_url: null,
    name: null,
    login: null,
    created_at: null,
    bio: null,
    public_repos: null,
    followers: null,
    following: null,
    location: null,
    blog: null,
    twitter_username: null,
    company: null,
  }
  const res = { data: nullUserRaw } as AxiosResponse;
  const mockGet = jest.spyOn(http, 'get');
  mockGet.mockResolvedValue(res);
  const onSuccess = jest.fn();
  const onError = jest.fn();
  await getUser(
    'p',
    onSuccess,
    onError
  );
  expect(onSuccess).toHaveBeenCalledWith(nullUser);
  expect(onError).not.toHaveBeenCalled();
});

it(`should call error callback when the result is an error object`, async () => {
  const error = new Error('test') as AxiosError;
  const mockGet = jest.spyOn(http, 'get');
  mockGet.mockResolvedValue(error);
  const onSuccess = jest.fn();
  const onError = jest.fn();
  await getUser(
    'p',
    onSuccess,
    onError
  );
  expect(onError).toHaveBeenCalledWith(new Error('test'));
  expect(onSuccess).not.toHaveBeenCalled();
});

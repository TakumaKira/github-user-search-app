import { AxiosError, AxiosResponse } from 'axios';
import getUser from './getUser';
import * as http from './http';

it(`should call success callback when the result is not an error object`, async () => {
  const res = { data: 'd' } as AxiosResponse;
  const mockGet = jest.spyOn(http, 'get');
  mockGet.mockResolvedValue(res);
  const onSuccess = jest.fn();
  const onError = jest.fn();
  await getUser(
    'p',
    onSuccess,
    onError
  );
  expect(onSuccess).toHaveBeenCalledWith(res.data);
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

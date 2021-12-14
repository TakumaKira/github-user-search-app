import axios from 'axios';
import { get } from './http';

it(`should return response data when succeeded`, async () => {
  const res = { data: 'd' };
  const mockGet = jest.spyOn(axios, 'get');
  mockGet.mockResolvedValue(res);
  const result = await get('p');
  expect(result).toEqual({ data: 'd' });
});

it(`should return error object when failed`, async () => {
  const error = new Error('test');
  const mockGet = jest.spyOn(axios, 'get');
  mockGet.mockRejectedValue(error);
  const result = await get('p');
  expect(result).toEqual(error);
});

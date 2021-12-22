import getIconUrl, { BASE_URL } from './getIconUrl';

it(`should return right result for the input`, () => {
  const input = 'a';
  const result = getIconUrl(input);
  expect(result).toBe(`${BASE_URL}#${input}`);
});
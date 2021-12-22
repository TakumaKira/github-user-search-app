import formatUsername from './formatUsername';

it(`should return formatted username`, () => {
  const username = 'a';
  expect(formatUsername(username)).toBe(`@${username}`);
});
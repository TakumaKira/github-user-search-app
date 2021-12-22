import isObject from './isObject';

export const obj = {};
export const nonObjects = [[], null, 'a', 1];

it(`should return true if the variable is an object`, () => {
  expect(isObject({})).toBe(true);
});

it(`should return false if the variable is not an object`, () => {
  for (const nonObject of nonObjects) {
    expect(isObject(nonObject)).toBe(false);
  }
});

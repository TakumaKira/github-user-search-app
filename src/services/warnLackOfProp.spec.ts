import { nonObjects } from './isObject.spec';
import warnLackOfProp, { getMessage, notAnObjectError } from './warnLackOfProp';

it(`should return value`, () => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  const value = 'a';
  const obj = { a: value };
  expect(warnLackOfProp(obj, 'a')).toBe(value);
  expect(warnLackOfProp(obj, 'b')).toBe(undefined);
});

it(`should warn only when the property is not defined`, () => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  const propName1 = 'n1';
  const value1 = 'v1';
  const propName2 = 'n2';
  const value2 = undefined;
  const propName3 = 'n3';
  const obj = { [propName1]: value1, [propName2]: value2 };
  warnLackOfProp(obj, propName1);
  expect(console.warn).not.toHaveBeenCalled();
  warnLackOfProp(obj, propName2);
  expect(console.warn).not.toHaveBeenCalled();
  warnLackOfProp(obj, propName3);
  expect(console.warn).toHaveBeenCalledWith(getMessage(propName3));
});

it(`should throw if data is not an object`, () => {
  for (const nonObject of nonObjects) {
    expect(() => warnLackOfProp(nonObject, 'a')).toThrow(notAnObjectError);
  }
});

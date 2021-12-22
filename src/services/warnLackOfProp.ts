import isObject from './isObject';

export const getMessage = (propName: string) => 
  `Data provided by the API does not contain a property named "${propName}".\nThis app should be updated.`;

export const notAnObjectError = new Error('Data must be an object.')

export default function warnLackOfProp(data: any, propName: string): any {
  if (!isObject(data)) throw notAnObjectError;
  if (!data.hasOwnProperty(propName)) {
    console.warn(getMessage(propName));
  }
  return data[propName];
}

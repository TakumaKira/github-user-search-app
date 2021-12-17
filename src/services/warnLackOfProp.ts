export default function warnLackOfProp(data: any, propName: string): any {
  if (!data.hasOwnProperty(propName)) {
    console.warn(`Data provided by the API does not contain a property named "${propName}".\nThis app should be updated.`);
  }
  return data[propName];
}

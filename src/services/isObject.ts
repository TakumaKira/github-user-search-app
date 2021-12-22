export default function isObject(variable: any): boolean {
  if (
    typeof variable === 'object'
    && !Array.isArray(variable)
    && variable !== null
  ) return true;
  return false;
}

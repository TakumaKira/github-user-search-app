export const BASE_URL = 'https://github.com';

export default function getUrlFromCompany(company: string): string {
  return `${BASE_URL}/${company.slice(1)}`;
}

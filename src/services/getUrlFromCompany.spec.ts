import getUrlFromCompany, { BASE_URL } from './getUrlFromCompany';

it(`should return correct url from company`, () => {
  const companyBody = 'github';
  const company = `@${companyBody}`
  expect(getUrlFromCompany(company)).toBe(`${BASE_URL}/${companyBody}`);
});

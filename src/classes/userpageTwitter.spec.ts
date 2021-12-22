import UserpageTwitter from './userpageTwitter';
import { userpageBaseUrl } from '../config.json';

it(`should return Twitter userpage url`, () => {
  const username = 'a';
  expect(new UserpageTwitter(username).getUrl()).toBe(`${userpageBaseUrl.twitter}/${username}`);
});

import UserpageGithub from './userpageGithub';
import { userpageBaseUrl } from '../config.json';

it(`should return Github userpage url`, () => {
  const username = 'a';
  expect(new UserpageGithub(username).getUrl()).toBe(`${userpageBaseUrl.github}/${username}`);
});

import User from '../types/user';
import { get } from './http';

export default async function getUser(
  username: string,
  onSuccess: (user: User) => void,
  onError: (error: Error) => void
) {
    const result = await get(`/users/${username}`);
    if (result instanceof Error) {
      onError(result);
    } else {
      const user = convert(result.data);
      onSuccess(user);
    }
  }

function convert(data: any): User {
  const createdAt = check(data, 'created_at');
  return {
    avatarUrl: check(data, 'avatar_url'),
    name: check(data, 'name'),
    username: check(data, 'login'),
    joinedDate: createdAt ? new Date(createdAt) : null,
    bio: check(data, 'bio'),
    repos: check(data, 'public_repos'),
    followers: check(data, 'followers'),
    following: check(data, 'following'),
    location: check(data, 'location'),
    blogUrl: check(data, 'blog'),
    twitterUsername: check(data, 'twitter_username'),
    company: check(data, 'company'),
  }
}

function check(data: any, propName: string): any {
  if (!data.hasOwnProperty(propName)) {
    console.warn(`Data provided by the API does not contain a property named "${propName}".\nThis app should be updated.`);
    return null;
  }
  return data[propName];
}

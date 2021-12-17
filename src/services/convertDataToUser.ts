import User from '../types/user';
import warnLackOfProp from './warnLackOfProp';

export default function convertDataToUser(data: any): User {
  const createdAt = warnLackOfProp(data, 'created_at');
  return {
    avatarUrl: warnLackOfProp(data, 'avatar_url') || null,
    name: warnLackOfProp(data, 'name') || null,
    username: warnLackOfProp(data, 'login'),
    joinedDate: createdAt ? new Date(createdAt) : null,
    bio: warnLackOfProp(data, 'bio') || null,
    repos: warnLackOfProp(data, 'public_repos') || null,
    followers: warnLackOfProp(data, 'followers') || null,
    following: warnLackOfProp(data, 'following') || null,
    location: warnLackOfProp(data, 'location') || null,
    blogUrl: warnLackOfProp(data, 'blog') || null,
    twitterUsername: warnLackOfProp(data, 'twitter_username') || null,
    company: warnLackOfProp(data, 'company') || null,
  }
}

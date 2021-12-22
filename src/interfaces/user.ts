export default interface User {
  avatarUrl: string | null;
  name: string | null;
  username: string | null;
  joinedDate: Date | null;
  bio: string | null;
  repos: number | null;
  followers: number | null;
  following: number | null;
  location: string | null;
  blogUrl: string | null;
  twitterUsername: string | null;
  company: string | null;
}

export const nullUser: User = {
  avatarUrl: null,
  name: null,
  username: null,
  joinedDate: null,
  bio: null,
  repos: null,
  followers: null,
  following: null,
  location: null,
  blogUrl: null,
  twitterUsername: null,
  company: null,
}
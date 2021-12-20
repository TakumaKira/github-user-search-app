import { userpageBaseUrl } from '../config.json';

export enum AccountType {
  Github = 'github',
  Twitter = 'twitter',
}

export default function getUserpage(username: string, accountType: AccountType): string {
  switch (accountType) {
    case AccountType.Github:
      return `${userpageBaseUrl.github}/${username}`;
    case AccountType.Twitter:
      return `${userpageBaseUrl.twitter}/${username}`;
    default:
      throw new Error(`Undefined AccountType: ${accountType}`);
  }
}
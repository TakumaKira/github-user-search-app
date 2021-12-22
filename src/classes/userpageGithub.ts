import UserpageBase from './userpageBase';
import { userpageBaseUrl } from '../config.json';

export default class UserpageGithub extends UserpageBase {
  baseUrl: string = userpageBaseUrl.github;
  getUrl(): string {
    return `${this.baseUrl}/${this.username}`;
  }
}
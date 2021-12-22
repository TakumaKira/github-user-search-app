import UserpageBase from './userpageBase';
import { userpageBaseUrl } from '../config.json';

export default class UserpageTwitter extends UserpageBase {
  baseUrl: string = userpageBaseUrl.twitter;
  getUrl(): string {
    return `${this.baseUrl}/${this.username}`;
  }
}
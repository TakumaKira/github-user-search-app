export default abstract class UserpageBase {
  abstract baseUrl: string;
  protected username: string;
  abstract getUrl(): string;
  constructor(username: string) {
    this.username = username;
  }
}

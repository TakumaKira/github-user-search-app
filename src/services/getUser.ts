import User from '../types/user';
import convertDataToUser from './convertDataToUser';
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
      const user = convertDataToUser(result.data);
      onSuccess(user);
    }
  }

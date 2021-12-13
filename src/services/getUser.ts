import { get } from './http';

export default async function getUser(
  username: string,
  onSuccess: (user: any) => void,
  onError: (error: Error) => void
) {
    const result = await get(`/users/${username}`);
    if (result instanceof Error) {
      onError(result);
    } else {
      onSuccess(result.data);
    }
  }

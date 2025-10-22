import type { User } from '@/types/user';
import { api } from './axios';
import { AxiosError } from 'axios';

export async function getCurrentUser() {
  try {
    const res = await api.get<User>('/api/users/me'); // Or your own endpoint
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return undefined;
      }
    }
  }
}

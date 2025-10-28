import { AxiosError } from 'axios';
import { api } from './axios';
import type { User } from '@/types/user';

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

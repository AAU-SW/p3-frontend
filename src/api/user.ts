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

export async function getUsers() {
  const res = await api.get(`api/users`);
  return res.data;
}

export async function getOneUser(userId: string) {
  const res = await api.get(`/api/users/${userId}`);
  return res.data;
}

export async function createUser(data: User) {
  const res = await api.post(`/api/users`, data);
  return res.data;
}

export async function updateOneUser(userId: string, data: Partial<User>) {
  const res = await api.put<User>(`api/users/${userId}`, data);
  return res.data;
}

export async function deleteOneUser(userId: string) {
  const res = await api.delete<User>(`api/users/${userId}`);
  return res.data;
}

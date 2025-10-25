import type { User } from '@/types/user';
import { create } from 'zustand';
import { login as apiLogin, logout as apiLogout } from '@/api/auth';
import { getCurrentUser as apiGetCurrentUser } from '@/api/user';

export type AuthStore = {
  user?: User;
  getCurrentUser: () => Promise<User | undefined>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthStore>((set, get) => ({
  user: undefined,
  getCurrentUser: async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      set({ user: undefined });
      return undefined;
    }

    if (get().user) {
      return get().user;
    }

    const userRes = await apiGetCurrentUser();
    set({ user: userRes });
    return userRes;
  },
  login: async (email, password) => {
    await apiLogin(email, password);
    await get().getCurrentUser();
  },
  logout: () => {
    apiLogout();
    set({ user: undefined });
  },
}));

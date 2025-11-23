import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use((config) => {
  if (!config.url?.includes('/api/auth/refresh')) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/api/auth/refresh')
    ) {
      return Promise.reject(err);
    }

    originalRequest._retry = true;

    if (refreshPromise) {
      try {
        const newToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        return Promise.reject(err);
      }
    }

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(err);
    }

    refreshPromise = (async () => {
      try {
        const { data } = await api.post('/api/auth/refresh', { refreshToken });
        if (data?.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          if (data?.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }
          return data.accessToken;
        }
        throw new Error('No access token in refresh response');
      } catch (error) {
        localStorage.clear();
        window.location.href = '/login';
        throw error;
      } finally {
        refreshPromise = null;
      }
    })();

    try {
      const newToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch {
      return Promise.reject(err);
    }
  },
);

import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config as any;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const rt = localStorage.getItem('refreshToken');
      if (rt) {
        try {
          const { data } = await api.post('/api/auth/refresh', {
            refreshToken: rt,
          });
          if (data?.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            original.headers = {
              ...(original.headers ?? {}),
              Authorization: `Bearer ${data.accessToken}`,
            };
            return api(original);
          }
        } catch (error) {
          console.error(error);
          alert('Session expired, please log in again.');
        }
      }
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

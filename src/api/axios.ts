import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

let accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry && refreshToken) {
      original._retry = true;
      try {
        const res = await axios.post('http://localhost:8080/api/auth/refresh', {
          refreshToken,
        });
        accessToken = res.data.accessToken;
        if (!accessToken) throw new Error('No access token returned');
        localStorage.setItem('accessToken', accessToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (e) {
        localStorage.clear();
        window.location.href = '/login';
        console.error(e);
      }
    }
    return Promise.reject(err);
  },
);

import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // Don't retry if this is already a retry or if it's the refresh endpoint itself
    if (
      err.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes('/api/auth/refresh')
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          })
          .catch(() => Promise.reject(err));
      }

      original._retry = true;
      isRefreshing = true;

      const rt = localStorage.getItem('refreshToken');
      if (!rt) {
        // No refresh token, clear and redirect
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      }

      try {
        const { data } = await api.post('/api/auth/refresh', {
          refreshToken: rt,
        });

        if (data?.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          // Update refresh token if server sends a new one
          if (data?.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }

          api.defaults.headers.common['Authorization'] =
            `Bearer ${data.accessToken}`;
          original.headers.Authorization = `Bearer ${data.accessToken}`;

          processQueue(null, data.accessToken);
          return api(original);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Main API instance with auth interceptors
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
});

// Separate instance for refresh requests (no interceptors to avoid loops)
const refreshApi = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
});

// Add access token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 errors and refresh tokens
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Ignore cancelled/aborted requests
        if (error.code === 'ECONNABORTED' || error.code === 'ERR_CANCELED') {
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        // Retry logic: only attempt refresh once per 5 seconds per request
        const now = Date.now();
        const lastRetryTime = originalRequest._retryTime || 0;
        const shouldRetry = error.response?.status === 401 && (now - lastRetryTime) > 5000;

        if (shouldRetry) {
            originalRequest._retryTime = now;
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                clearAuthAndRedirect();
                return Promise.reject(error);
            }

            try {
                const {data} = await refreshApi.post('/api/auth/refresh', {refreshToken});

                if (!data?.accessToken) {
                    throw new Error('No access token returned');
                }

                // Store new token and retry original request
                localStorage.setItem('accessToken', data.accessToken);
                delete originalRequest.headers.Authorization; // Let request interceptor add it

                return api(originalRequest);
            } catch (refreshError: any) {
                // Don't redirect on network errors
                if (refreshError.code === 'ECONNABORTED' || refreshError.code === 'ERR_CANCELED') {
                    return Promise.reject(refreshError);
                }

                clearAuthAndRedirect();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Helper function to clear auth state and redirect
function clearAuthAndRedirect() {
    localStorage.clear();
    window.location.href = '/login';
}
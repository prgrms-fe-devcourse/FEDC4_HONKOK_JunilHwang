import axios from 'axios';
import { getStoredData } from '~/utils/userStorage';

export const snsApiClient = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? '/api'
      : import.meta.env.VITE_API_END_POINT
});

snsApiClient.interceptors.request.use((config) => {
  const token = getStoredData('user-token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

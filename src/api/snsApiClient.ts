import axios from 'axios';
import { getStoredData } from '~/utils/userStorage';

export const snsApiClient = axios.create({ baseURL: '/api' });

snsApiClient.interceptors.request.use((config) => {
  const token = getStoredData('user-token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

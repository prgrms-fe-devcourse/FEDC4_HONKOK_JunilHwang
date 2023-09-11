import axios from 'axios';
import { getStoredUser } from '~/hooks/userStorage';

const { VITE_API_END_POINT } = import.meta.env;

export const snsApiClient = axios.create({
  baseURL: VITE_API_END_POINT
});

snsApiClient.interceptors.request.use((config) => {
  const user = getStoredUser();

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

import axios from 'axios';

const { VITE_API_END_POINT } = import.meta.env;

export const snsApiClient = axios.create({
  baseURL: VITE_API_END_POINT
});

snsApiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

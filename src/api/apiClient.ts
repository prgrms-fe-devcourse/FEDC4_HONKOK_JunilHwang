import axios from 'axios';

const { VITE_API_END_POINT } = import.meta.env;

export const apiClient = axios.create({
  baseURL: VITE_API_END_POINT
});

apiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

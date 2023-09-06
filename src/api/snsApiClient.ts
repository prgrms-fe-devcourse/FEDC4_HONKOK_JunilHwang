import axios from 'axios';

const { VITE_API_END_POINT } = import.meta.env;

export const snsApiClient = axios.create({
  baseURL: VITE_API_END_POINT
});

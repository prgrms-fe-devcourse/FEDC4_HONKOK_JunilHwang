import axios from 'axios';

const { API_END_POINT } = import.meta.env;

export const snsApiClient = axios.create({
  baseURL: API_END_POINT
});

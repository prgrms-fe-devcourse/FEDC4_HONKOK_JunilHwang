import { apiClient } from '../api';

type Login = {
  email: string;
  password: string;
};

type Signup = {
  email: string;
  fullName: string;
  password: string;
};

const userService = {
  async login({ email, password }: Login) {
    return await apiClient.post('/login', { email, password });
  },

  async signup({ email, fullName, password }: Signup) {
    return await apiClient.post('/signup', { email, fullName, password });
  }
};

export default userService;

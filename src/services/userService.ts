import { apiClient } from '../api';

const userService = {
  async login({ email, password }: { email: string; password: string }) {
    return await apiClient.post('/login', {
      email,
      password
    });
  }
};

export default userService;

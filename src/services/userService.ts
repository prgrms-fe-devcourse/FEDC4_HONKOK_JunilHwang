import { snsApiClient } from '../api';

const userService = {
  async login({ email, password }: { email: string; password: string }) {
    return await snsApiClient.post('/login', {
      email,
      password
    });
  }
};

export default userService;

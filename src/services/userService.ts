import { apiClient } from '../api';

interface SignIn {
  email: string;
  password: string;
}

interface SignUp {
  email: string;
  fullName: string;
  password: string;
}

const userService = {
  async signIn({ email, password }: SignIn) {
    return await apiClient.post('/login', { email, password });
  },

  async signUp({ email, fullName, password }: SignUp) {
    return await apiClient.post('/signup', { email, fullName, password });
  }
};

export default userService;

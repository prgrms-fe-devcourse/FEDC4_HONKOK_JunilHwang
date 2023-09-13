import { useMutation } from '@tanstack/react-query';
import { snsApiClient } from '~/api';

interface SignIn {
  email: string;
  password: string;
}

interface SignUp {
  email: string;
  fullName: string;
  password: string;
}

const signIn = async ({ email, password }: SignIn) => {
  return await snsApiClient.post('/login', { email, password });
};

const signUp = async ({ email, fullName, password }: SignUp) => {
  return await snsApiClient.post('/signup', { email, fullName, password });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ data }) => {
      window.localStorage.setItem('token', data.token);
    }
  });
};

export const useSignUp = () => {
  return useMutation({ mutationFn: signUp });
};

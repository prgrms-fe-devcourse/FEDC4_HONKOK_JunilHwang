import useUser from './useUser';
import { snsApiClient } from '~/api';
import { ApiError } from '~/utils/apiError';

interface SignIn {
  email: string;
  password: string;
}

interface SignUp extends SignIn {
  fullName: string;
}

const BAD_REQUEST = 400;

const useAuth = () => {
  const { clearUser, initialUser } = useUser();

  const authServerCall = async (
    urlEndpoint: string,
    authInfo: SignIn | SignUp
  ) => {
    try {
      const { data, status } = await snsApiClient.post(urlEndpoint, authInfo);

      if (status === BAD_REQUEST) {
        return;
      }

      if ('user' in data && 'token' in data) {
        initialUser(data.user, data.token);
      }

      return data;
    } catch (error) {
      throw new ApiError('unauthorized');
    }
  };

  const signIn = async ({ email, password }: SignIn) => {
    await authServerCall('/login', { email, password });
  };

  const signUp = async ({ email, fullName, password }: SignUp) => {
    await authServerCall('/signup', { email, fullName, password });
  };

  const signOut = () => {
    clearUser();
  };

  return { signIn, signUp, signOut };
};

export default useAuth;

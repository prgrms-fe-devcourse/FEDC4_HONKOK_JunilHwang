import useUser from './useUser';
import { snsApiClient } from '~/api';

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
      throw new Error('이메일 혹은 비밀번호를 잘못 입력했습니다.');
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

import { snsApiClient } from '~/api';
import useUser from './useUser';

interface SignIn {
  email: string;
  password: string;
}

interface SignUp extends SignIn {
  fullName: string;
}

function useAuth() {
  const { clearUser, updateUser } = useUser();

  async function authServerCall(
    urlEndpoint: string,
    authInfo: SignIn | SignUp
  ) {
    try {
      const { data, status } = await snsApiClient.post(urlEndpoint, authInfo);

      if (status === 400) {
        console.log('Unauthorized');
        return;
      }

      if ('user' in data && 'token' in data) {
        updateUser(data);
      }
    } catch {}
  }

  async function signIn({ email, password }: SignIn) {
    authServerCall('/login', { email, password });
  }

  async function signUp({ email, fullName, password }: SignUp) {
    authServerCall('/signup', { email, fullName, password });
  }

  function signOut() {
    clearUser();
  }

  return { signIn, signUp, signOut };
}

export default useAuth;

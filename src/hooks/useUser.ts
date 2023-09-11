import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clearStoredUser, getStoredUser, setStoredUser } from './userStorage';
import { snsApiClient } from '~/api';

async function getUser(user: any) {
  if (!user) return null;

  const { data } = await snsApiClient.get('/auth-user', {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
  return { user: data, token: user.token };
}

function useUser() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: (): any => getUser(user),
    initialData: getStoredUser(),
    onSuccess: (received) => {
      if (received) {
        setStoredUser(received);
      } else {
        clearStoredUser();
      }
    }
  });

  function updateUser(newUser: any) {
    queryClient.setQueryData(['user'], newUser);
  }

  function clearUser() {
    queryClient.setQueryData(['user'], null);
    clearStoredUser();
  }

  return { user, updateUser, clearUser };
}

export default useUser;

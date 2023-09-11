import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clearStoredUser, getStoredUser, setStoredUser } from './userStorage';
import { snsApiClient } from '~/api';

const getUser = async (user: any) => {
  if (!user) return null;

  const { data } = await snsApiClient.get('/auth-user', {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
  return { user: data, token: user.token };
};

const useUser = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: (): any => getUser(user),
    initialData: getStoredUser(),
    onSuccess: (received) => {
      received ? setStoredUser(received) : clearStoredUser();
    }
  });

  const updateUser = (newUser: any) => {
    queryClient.setQueryData(['user'], newUser);
  };

  const clearUser = () => {
    queryClient.setQueryData(['user'], null);
    clearStoredUser();
  };

  return { user, updateUser, clearUser };
};

export default useUser;

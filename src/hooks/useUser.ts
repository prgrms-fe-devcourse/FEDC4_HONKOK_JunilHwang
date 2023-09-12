import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clearStoredData, getStoredData, setStoredData } from './userStorage';
import { snsApiClient } from '~/api';

const userKeys = {
  user: ['user'] as const,
  userToken: ['user-token'] as const
};

const getUser = async () => {
  if (!getStoredData('user-token')) return null;

  const { data } = await snsApiClient.get('/auth-user');

  return data;
};

const useUser = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: userKeys.user,
    queryFn: getUser,
    initialData: getStoredData('user'),
    onSuccess: (received) => {
      received ? setStoredData('user', received) : clearStoredData('user');
    },
    refetchOnWindowFocus: true
  });

  const initialUser = (user: any, token: string) => {
    setStoredData('user-token', token);
    queryClient.setQueryData(userKeys.user, user);
  };

  const updateUser = (newUser: any) => {
    queryClient.setQueryData(userKeys.user, newUser);
  };

  const clearUser = () => {
    queryClient.setQueryData(userKeys.user, null);
    clearStoredData('user-token');
    clearStoredData('user');
  };

  return { user, updateUser, clearUser, initialUser };
};

export default useUser;

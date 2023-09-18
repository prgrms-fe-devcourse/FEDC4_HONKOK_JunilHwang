import { useQuery, useQueryClient } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { User } from '~/types';
import { clearStoredData, getStoredData, setStoredData } from '~/utils';

const userKeys = {
  user: ['user'] as const
};

const useUser = () => {
  const queryClient = useQueryClient();

  const getUser = async () => {
    if (!getStoredData('user-token')) return null;

    const { data } = await snsApiClient.get('/auth-user');

    return data;
  };

  const { data: user, isLoading: userIsLoading } = useQuery({
    queryKey: userKeys.user,
    queryFn: getUser
  });

  const initialUser = (user: User, token: string) => {
    setStoredData('user-token', token);
    queryClient.setQueryData(userKeys.user, user);
  };

  const updateUser = (newUser: User) => {
    queryClient.setQueryData(userKeys.user, newUser);
  };

  const clearUser = () => {
    queryClient.setQueryData(userKeys.user, null);
    clearStoredData('user-token');
  };

  return { user, userIsLoading, updateUser, clearUser, initialUser };
};

export default useUser;

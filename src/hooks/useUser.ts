import { useQuery, useQueryClient } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { User } from '~/types';
import { assert, clearStoredData, getStoredData, setStoredData } from '~/utils';

export const userKeys = {
  user: ['user'] as const
};

const getUser = async () => {
  if (!getStoredData('user-token')) return null;

  const { data } = await snsApiClient.get('/auth-user');

  if (!data) {
    clearStoredData('user-token');

    return null;
  }

  return data;
};

const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: userIsLoading,
    isError
  } = useQuery<User>({
    queryKey: userKeys.user,
    queryFn: getUser,
    staleTime: Infinity,
    cacheTime: Infinity,
    suspense: true
  });

  if (user !== null) {
    assert(user);
  }

  const initialUser = (user: User, token: string) => {
    setStoredData('user-token', token);
    queryClient.setQueryData(userKeys.user, user);
  };

  const updateUser = (newUser: User) => {
    queryClient.setQueryData(userKeys.user, newUser);
  };

  const clearUser = () => {
    queryClient.removeQueries(['notifications']);
    queryClient.setQueryData(userKeys.user, null);
    clearStoredData('user-token');
  };

  if (isError) clearUser();

  return { user, userIsLoading, updateUser, clearUser, initialUser };
};

export default useUser;

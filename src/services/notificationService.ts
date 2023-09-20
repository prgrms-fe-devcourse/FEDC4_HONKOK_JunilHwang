import { useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { User } from '~/types';

const notificationKeys = {
  all: ['notifications'] as const
};

const getNotifications = async (): Promise<Notification[]> => {
  const response = await snsApiClient.get('/notifications');

  return response.data;
};

const useGetNotifications = (user: User) => {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: getNotifications,
    retry: false,
    initialData: [],
    enabled: !!user
  });
};

export { useGetNotifications };

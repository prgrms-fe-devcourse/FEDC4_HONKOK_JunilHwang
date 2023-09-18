import { useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';

const notificationKeys = {
  all: ['notifications'] as const
};

const getNotifications = async (): Promise<Notification[]> => {
  const response = await snsApiClient.get('/notifications');

  return response.data;
};

const useGetNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: getNotifications
  });
};

export { useGetNotifications };

import { useMutation, useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Notification, User } from '~/types';

interface CreateNotification {
  notificationType: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE';
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

const notificationKeys = {
  all: ['notifications'] as const
};

const getNotifications = async (): Promise<Notification[]> => {
  const response = await snsApiClient.get('/notifications');

  return response.data;
};

const putNotificationsSeen = async () => {
  return snsApiClient.put('/notifications/seen');
};

const createNotification = async ({
  notificationType,
  notificationTypeId,
  userId,
  postId
}: CreateNotification) => {
  return snsApiClient.post('/notifications/create', {
    notificationType,
    notificationTypeId,
    userId,
    postId
  });
};

export const useGetNotifications = (user: User) => {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: getNotifications,
    retry: false,
    initialData: [],
    enabled: !!user,
    refetchInterval: 3000,
    refetchIntervalInBackground: true
  });
};

export const usePutNotificationsSeen = () => {
  return useMutation({ mutationFn: putNotificationsSeen });
};

export const useCreateNotification = () => {
  return useMutation({ mutationFn: createNotification });
};

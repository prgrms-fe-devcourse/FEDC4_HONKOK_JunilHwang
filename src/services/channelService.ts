import { useMutation, useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Channel } from '~/types';

interface Create {
  authRequired: boolean;
  description: string;
  name: string;
}

const channelKeys = {
  all: ['channels'] as const
};

const getChannels = async (): Promise<Channel[]> => {
  const response = await snsApiClient.get('/channels');

  return response.data;
};

const createChannel = async ({ authRequired, description, name }: Create) => {
  await snsApiClient.post('/channels/create', {
    authRequired,
    description,
    name
  });
};

export const useGetChannels = () => {
  return useQuery({
    queryKey: channelKeys.all,
    queryFn: getChannels,
    initialData: []
  });
};

export const useCreateChannel = () => {
  return useMutation({ mutationFn: createChannel });
};

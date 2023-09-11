import { useMutation, useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';

interface Create {
  authRequired: boolean;
  description: string;
  name: string;
}

const channelKeys = {
  all: ['channels'] as const
};

const getChannels = async () => {
  const response = await snsApiClient.get('/channels');

  return response.data;
};

const createChannel = async ({ authRequired, description, name }: Create) => {
  return await snsApiClient.post('/channels/create', {
    authRequired,
    description,
    name
  });
};

export const useGetChannels = () => {
  return useQuery({ queryKey: channelKeys.all, queryFn: getChannels });
};

export const useCreateChannel = () => {
  return useMutation({ mutationFn: createChannel });
};

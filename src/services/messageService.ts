import { useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Conversation } from '~/types';

const messageKeys = {
  conversations: ['conversations'] as const
};

const getConversations = async (): Promise<Conversation[]> => {
  const response = await snsApiClient.get('/messages/conversations');

  return response.data;
};

const getChat = async () => {};

const createMessage = async () => {};

const putMessageUpdateSeen = async () => {};

export const useGetConversations = () => {
  return useQuery({
    queryKey: messageKeys.conversations,
    queryFn: getConversations,
    initialData: []
  });
};

export const useGetChat = () => {};

export const useCreateMessage = () => {};

export const usePutMessageUpdateSeen = () => {};

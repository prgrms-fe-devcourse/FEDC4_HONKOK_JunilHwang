import { useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Conversation, Message } from '~/types';

const messageKeys = {
  conversations: ['conversations'] as const,
  chat: (userId: string) => ['chat', userId] as const
};

const getConversations = async (): Promise<Conversation[]> => {
  const response = await snsApiClient.get('/messages/conversations');

  return response.data;
};

const getChat = async ({ userId }: { userId: string }): Promise<Message[]> => {
  const response = await snsApiClient.get('/messages', { params: { userId } });

  return response.data;
};

const createMessage = async () => {};

const putMessageUpdateSeen = async () => {};

export const useGetConversations = () => {
  return useQuery({
    queryKey: messageKeys.conversations,
    queryFn: getConversations,
    initialData: []
  });
};

export const useGetChat = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: messageKeys.chat(userId),
    queryFn: () => getChat({ userId }),
    initialData: []
  });
};

export const useCreateMessage = () => {};

export const usePutMessageUpdateSeen = () => {};

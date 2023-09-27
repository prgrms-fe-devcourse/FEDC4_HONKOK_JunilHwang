import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Conversation, Message } from '~/types';
import { ApiError } from '~/utils/apiError';

interface CreateMessage {
  message: string;
  receiver: string;
}

interface PutMessageUpdateSeen {
  sender: string;
}

const messageKeys = {
  conversations: ['conversations'] as const,
  chat: (userId: string) => ['chat', userId] as const
};

const getConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await snsApiClient.get('/messages/conversations');

    return response.data;
  } catch (error) {
    throw new ApiError('badRequest');
  }
};

const getChat = async ({ userId }: { userId: string }): Promise<Message[]> => {
  const response = await snsApiClient.get('/messages', { params: { userId } });

  return response.data;
};

const createMessage = async ({ message, receiver }: CreateMessage) => {
  return snsApiClient.post('/messages/create', { message, receiver });
};

const putMessageUpdateSeen = async ({ sender }: PutMessageUpdateSeen) => {
  return snsApiClient.put('/messages/update-seen', { sender });
};

export const useGetConversations = () => {
  return useQuery({
    queryKey: messageKeys.conversations,
    queryFn: getConversations,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    suspense: true
  });
};

export const useGetChat = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: messageKeys.chat(userId),
    queryFn: () => getChat({ userId }),
    initialData: [],
    refetchInterval: 3000,
    refetchIntervalInBackground: true
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMessage,
    onSuccess: ({ data }) => {
      return queryClient.invalidateQueries({
        queryKey: messageKeys.chat(data.receiver._id)
      });
    }
  });
};

export const usePutMessageUpdateSeen = () => {
  return useMutation({ mutationFn: putMessageUpdateSeen });
};

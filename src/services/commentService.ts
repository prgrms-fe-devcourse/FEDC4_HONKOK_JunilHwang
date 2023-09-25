import { useMutation, useQueryClient } from '@tanstack/react-query';
import { snsApiClient } from '~/api';

interface CreateComment {
  comment: string;
  postId: string;
}

interface RemoveComment {
  commentId: string;
}

const createComment = async ({ comment, postId }: CreateComment) => {
  await snsApiClient.post('/comments/create', { comment, postId });
};

const removeComment = async ({ commentId }: RemoveComment) => {
  await snsApiClient.delete('/comments/delete', { data: { id: commentId } });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['Post']);
    }
  });
};

export const useRemoveComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['Post']);
    }
  });
};

import { useMutation } from '@tanstack/react-query';
import { snsApiClient } from '~/api';

interface CreateComment {
  comment: string;
  postId: string;
}

interface RemoveComment {
  commentId: string;
}

const createComment = async ({ comment, postId }: CreateComment) => {
  return await snsApiClient.post('/comments/create', { comment, postId });
};

const removeComment = async ({ commentId }: RemoveComment) => {
  return await snsApiClient.delete('/comments/delete', {
    data: { id: commentId }
  });
};

export const useCreateComment = () => {
  return useMutation({ mutationFn: createComment });
};

export const useRemoveComment = () => {
  return useMutation({ mutationFn: removeComment });
};

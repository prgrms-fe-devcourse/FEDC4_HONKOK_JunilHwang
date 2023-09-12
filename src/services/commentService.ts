import { useMutation } from '@tanstack/react-query';
import { snsApiClient } from '~/api';

interface CreateComment {
  comment: string;
  postId: string;
}

const createComment = async ({ comment, postId }: CreateComment) => {
  return await snsApiClient.post('/comments/create', { comment, postId });
};

export const useCreateComment = () => {
  return useMutation({ mutationFn: createComment });
};

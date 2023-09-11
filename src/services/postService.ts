import { useMutation } from '@tanstack/react-query';
import { snsApiClient } from '~/api';

interface CreatePost {
  title: string;
  content: string;
  image?: BinaryType;
  channelId: string;
}

const createPost = async ({ title, content, image, channelId }: CreatePost) => {
  const customPost = JSON.stringify({ title, content });

  return await snsApiClient.post('/posts/create', {
    title: customPost,
    image,
    channelId
  });
};

export const useCreatePost = () => {
  return useMutation({ mutationFn: createPost });
};

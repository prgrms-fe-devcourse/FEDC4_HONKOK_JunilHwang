import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import axios from 'axios';
import { snsApiClient } from '~/api';
import { useInfiniteScroll } from '~/hooks';
import { Like, Post } from '~/types/model';

interface CreatePost {
  title: string;
  content: string;
  image?: File;
  channelId: string;
}

interface EditPost {
  postId: string;
  title: string;
  content: string;
  image?: File;
  imageToDeletePublicId?: string;
  channelId: string;
}

interface GetPosts {
  channelId: string;
  limit?: number;
  offset?: number;
}

const imageFileKeys = {
  all: [Image] as const,
  file: (src: string) => [...imageFileKeys.all, src] as const
};

const postKeys = {
  all: ['Post'] as const,
  post: (postId: string) => [...postKeys.all, postId] as const
};

const createPost = async ({ title, content, image, channelId }: CreatePost) => {
  const customPost = JSON.stringify({ title, content });
  const formData = new FormData();

  formData.append('image', image ?? '');
  formData.append('title', customPost);
  formData.append('channelId', channelId);

  return snsApiClient.post('/posts/create', formData);
};

export const getPost = async (postId: string): Promise<Post> => {
  const response = await snsApiClient.get(`/posts/${postId}`);

  const { title, content } = JSON.parse(response.data.title);

  const parsedData = { ...response.data, title, content };

  return parsedData;
};

const editPost = async ({
  postId,
  title,
  content,
  image,
  imageToDeletePublicId,
  channelId
}: EditPost) => {
  const customPost = JSON.stringify({ title, content });
  const formData = new FormData();

  formData.append('image', image ?? '');
  formData.append('title', customPost);
  formData.append('postId', postId);
  formData.append('imageToDeletePublicId', imageToDeletePublicId ?? '');
  formData.append('channelId', channelId);

  return snsApiClient.put('/posts/update', formData);
};

const deletePost = async (id: string) => {
  await snsApiClient.delete('/posts/delete', { data: { id } });
};

const likePost = async (postId: string) => {
  return snsApiClient.post('/likes/create', { postId });
};

const unlikePost = async (id: string) => {
  return snsApiClient.delete('/likes/delete', { data: { id } });
};

const getPosts = async ({
  channelId,
  limit,
  offset
}: GetPosts): Promise<Post[]> => {
  const response = await snsApiClient.get(`/posts/channel/${channelId}`, {
    params: { limit, offset }
  });

  const parsedData = response.data.map((post: Post) => {
    const { title, content } = JSON.parse(post.title);

    return { ...post, title, content };
  });

  return parsedData;
};

const convertImageToFile = async (src: string) => {
  const { data: blob } = await axios(src, { responseType: 'blob' });
  const type = { type: blob.type };
  const file = new File([blob], src, type);

  return file;
};

export const useCreatePost = () => {
  return useMutation({ mutationFn: createPost });
};

export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: postKeys.post(postId),
    queryFn: () => getPost(postId),
    suspense: true,
    enabled: !!postId
  });
};

export const useEditPost = () => {
  return useMutation({ mutationFn: editPost });
};

export const useDeletePost = () => {
  return useMutation({ mutationFn: deletePost });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(['Post', data.post]);
      await queryClient.invalidateQueries(['user']);
    }
  });
};

export const useUnLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikePost,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(['Post', data.post]);
      await queryClient.invalidateQueries(['user']);
    }
  });
};

export const useGetPosts = ({ channelId, limit }: Omit<GetPosts, 'offset'>) => {
  return useInfiniteScroll({
    fetchData: (pageParam) => getPosts({ channelId, limit, offset: pageParam }),
    queryKey: channelId
  });
};

export const useGetLikePosts = ({ likePosts }: { likePosts: Like[] }) => {
  return useQueries({
    queries: likePosts.map((post) => {
      return {
        queryKey: ['likePost', post.post],
        queryFn: () => getPost(post.post),
        suspense: true
      };
    })
  });
};

export const useGetImageFile = (src: string) => {
  return useQuery({
    queryKey: imageFileKeys.file(src),
    queryFn: () => convertImageToFile(src),
    enabled: !!src
  });
};

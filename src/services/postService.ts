import { useMutation, useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Post } from '~/types/model';

interface CreatePost {
  title: string;
  content: string;
  image?: BinaryType;
  channelId: string;
}

interface EditPost {
  postId: string;
  title: string;
  content: string;
  image: BinaryType | null;
  imageToDeletePublicId?: string;
  channelId: string;
}

interface GetPosts {
  channelId: string;
  limit?: number;
  offset?: number;
}

interface Title {
  title: string;
  content: string;
}

const postsKeys = {
  all: ['Posts'] as const,
  posts: ({ channelId, limit, offset }: GetPosts) =>
    [...postsKeys.all, channelId, limit, offset] as const
};

const postKeys = {
  all: ['Post'] as const,
  post: (postId: string) => [...postKeys.all, postId] as const
};

const createPost = async ({ title, content, image, channelId }: CreatePost) => {
  const customPost = JSON.stringify({ title, content });

  return await snsApiClient.post('/posts/create', {
    title: customPost,
    image,
    channelId
  });
};

const getPost = async (postId: string): Promise<Post> => {
  const response = await snsApiClient.get(`/posts/${postId}`);

  return response.data;
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

  return await snsApiClient.put('/posts/update', {
    postId,
    title: customPost,
    image,
    imageToDeletePublicId,
    channelId
  });
};

const deletePost = async (id: string) => {
  return await snsApiClient.delete('/posts/delete', { data: { id } });
};

const likePost = async (postId: string) => {
  return await snsApiClient.post('/likes/create', { postId });
};

const unlikePost = async (id: string) => {
  return await snsApiClient.delete('/likes/delete', { data: { id } });
};

/**
 * @todo title에 JSON.stringify를 사용하지 않은 데이터가 들어 있어서 JSON.parse를 하면 오류발생
 * 해당 오류를 해결하기 위해 만든 함수, 데이터 입력을 title, content로 확실하게 받은 이후 삭제 예상
 */
const getPostTitle = (postTitle: string): Title => {
  try {
    const { title, content } = JSON.parse(postTitle);

    return { title, content };
  } catch (error) {
    return { title: postTitle, content: ' ' };
  }
};

const getPosts = async ({
  channelId,
  limit,
  offset
}: GetPosts): Promise<Post[]> => {
  if (!channelId) {
    return [];
  }

  const response = await snsApiClient.get(`/posts/channel/${channelId}`, {
    params: { limit, offset }
  });

  const parsedData = response.data.map((post: Post) => {
    const { title, content } = getPostTitle(post.title);

    return { ...post, title, content };
  });

  return parsedData;
};

export const useCreatePost = () => {
  return useMutation({ mutationFn: createPost });
};

export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: postKeys.post(postId),
    queryFn: () => getPost(postId),
    retry: false,
    // initialData: {} as Post,
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
  return useMutation({ mutationFn: likePost });
};

export const useUnLikePost = () => {
  return useMutation({ mutationFn: unlikePost });
};

export const useGetPosts = ({ channelId, limit = 5, offset = 0 }: GetPosts) => {
  return useQuery({
    queryKey: postsKeys.posts({ channelId, limit, offset }),
    queryFn: () => getPosts({ channelId, limit, offset }),
    retry: false
  });
};

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

  await snsApiClient.post('/posts/create', formData);
};

/**
 * @todo title에 JSON.stringify를 사용하지 않은 데이터가 들어 있어서 JSON.parse를 하면 오류발생
 * 해당 오류를 해결하기 위해 만든 함수, 데이터 입력을 title, content로 확실하게 받은 이후 삭제 예상
 */
const parsePostTitle = (postTitle: string): Pick<Post, 'title' | 'content'> => {
  try {
    const { title, content } = JSON.parse(postTitle);

    return { title, content };
  } catch (error) {
    return { title: postTitle, content: ' ' };
  }
};

export const getPost = async (postId: string): Promise<Post> => {
  const response = await snsApiClient.get(`/posts/${postId}`);

  const { title, content } = parsePostTitle(response.data.title);

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

  await snsApiClient.put('/posts/update', formData);
};

const deletePost = async (id: string) => {
  await snsApiClient.delete('/posts/delete', { data: { id } });
};

const likePost = async (postId: string) => {
  await snsApiClient.post('/likes/create', { postId });
};

const unlikePost = async (id: string) => {
  await snsApiClient.delete('/likes/delete', { data: { id } });
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
    const { title, content } = parsePostTitle(post.title);

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
    onSuccess: async () => {
      await queryClient.invalidateQueries(['Post']);
    }
  });
};

export const useUnLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['Post']);
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
        queryFn: () => getPost(post.post)
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

import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { useInfiniteScroll } from '~/hooks';
import { Follow, Post, User } from '~/types';
interface GetUserPosts {
  authorId: string;
  limit?: number;
  offset?: number;
}

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

const getPosts = async ({
  authorId,
  limit,
  offset
}: GetUserPosts): Promise<Post[]> => {
  const response = await snsApiClient.get(`/posts/author/${authorId}`, {
    params: { limit, offset }
  });

  const parsedData = response.data.map((post: Post) => {
    const { title, content } = parsePostTitle(post.title);

    return { ...post, title, content };
  });

  return parsedData;
};

const getUserInfo = async (userId: string): Promise<User> => {
  const response = await snsApiClient.get(`/users/${userId}`);

  return response.data;
};

const createFollow = async (userId: string) => {
  return snsApiClient.post('/follow/create', { userId });
};

const deleteFollow = async (id: string) => {
  return snsApiClient.delete('/follow/delete', { data: { id } });
};

const editFullName = async (fullName: string) => {
  await snsApiClient.put('/settings/update-user', { fullName });
};

const editPassword = async (password: string) => {
  await snsApiClient.put('/settings/update-password', { password });
};

const editProfileImage = async (formData: FormData) => {
  await snsApiClient.post('/users/upload-photo', formData);
};

export const useGetUserPosts = ({
  authorId,
  limit
}: Omit<GetUserPosts, 'offset'>) => {
  return useInfiniteScroll({
    fetchData: (pageParam) => getPosts({ authorId, limit, offset: pageParam }),
    queryKey: authorId
  });
};

export const useGetUserInfo = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfo(userId),
    suspense: true
  });
};

export const useGetFollowInfo = ({
  followList,
  showFollowers
}: {
  followList: Follow[];
  showFollowers: boolean;
}) => {
  return useQueries({
    queries: followList.map((follow) => {
      return {
        queryKey: [
          'followInfo',
          follow._id,
          showFollowers,
          follow.follower,
          follow.user
        ],
        queryFn: () =>
          getUserInfo(showFollowers ? follow.follower : follow.user),
        suspense: true
      };
    })
  });
};

export const useCreateFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFollow,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(data.user);
      await queryClient.invalidateQueries(['user']);
    }
  });
};

export const useDeleteFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFollow,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(data.user);
      await queryClient.invalidateQueries(['user']);
    }
  });
};

export const useEditFullName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editFullName,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user']);
    }
  });
};

export const useEditPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user']);
    }
  });
};

export const useEditProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfileImage,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user']);
    }
  });
};

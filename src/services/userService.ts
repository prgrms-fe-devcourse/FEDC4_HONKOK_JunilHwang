import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { useInfiniteScroll } from '~/hooks';
import { userKeys } from '~/hooks/useUser';
import { Follow, Post, User } from '~/types';

interface SignIn {
  email: string;
  password: string;
}

interface SignUp {
  email: string;
  fullName: string;
  password: string;
}

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

const signIn = async ({ email, password }: SignIn) => {
  return await snsApiClient.post('/login', { email, password });
};

const signUp = async ({ email, fullName, password }: SignUp) => {
  return await snsApiClient.post('/signup', { email, fullName, password });
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
  const res = await snsApiClient.get(`/users/${userId}`);

  return res.data;
};

const createFollow = async (userId: string) => {
  return await snsApiClient.post('/follow/create', {
    userId
  });
};

const deleteFollow = async (id: string) => {
  return await snsApiClient.delete('/follow/delete', {
    data: {
      id
    }
  });
};

const editFullName = async (fullName: string) => {
  await snsApiClient.put('/settings/update-user', {
    fullName
  });
};

const editPassword = async (password: string) => {
  await snsApiClient.put('/settings/update-password', {
    password
  });
};

const editProfileImage = async (formData: FormData) => {
  await snsApiClient.post('/users/upload-photo', formData);
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ data }) => {
      window.localStorage.setItem('token', data.token);
    }
  });
};

export const useSignUp = () => {
  return useMutation({ mutationFn: signUp });
};

export const useGetUserPosts = ({
  authorId,
  limit
}: Omit<GetUserPosts, 'offset'>) => {
  return useInfiniteScroll({
    fetchData: (pageParam) => getPosts({ authorId, limit, offset: pageParam })
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
      await queryClient.invalidateQueries(userKeys.user);
    }
  });
};

export const useDeleteFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFollow,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(data.user);
      await queryClient.invalidateQueries(userKeys.user);
    }
  });
};

export const useEditFullName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editFullName,
    onSuccess: async () => {
      await queryClient.invalidateQueries(userKeys.user);
    }
  });
};

export const useEditPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries(userKeys.user);
    }
  });
};

export const useEditProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfileImage,
    onSuccess: async () => {
      await queryClient.invalidateQueries(userKeys.user);
    }
  });
};

import { useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { useInfiniteScroll } from '~/hooks';
import { Post, User } from '~/types';
interface GetUserPosts {
  authorId: string;
  limit?: number;
  offset?: number;
}

const userKeys = {
  user: (userId: string) => ['users', userId]
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

export const getUserInfo = async ({ id }: { id: string }): Promise<User> => {
  const response = await snsApiClient.get(`/users/${id}`);

  return response.data;
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
    queryKey: userKeys.user(userId),
    queryFn: () => getUserInfo({ id: userId }),
    suspense: true
  });
};

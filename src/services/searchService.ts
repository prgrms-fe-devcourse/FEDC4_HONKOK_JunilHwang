import { useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Post, User } from '~/types';

interface SearchAll {
  query: string;
}

const parsePostTitle = (postTitle: string): Pick<Post, 'title' | 'content'> => {
  try {
    const { title, content } = JSON.parse(postTitle);

    return { title, content };
  } catch (error) {
    return { title: postTitle, content: ' ' };
  }
};

const searchAll = async ({
  query
}: SearchAll): Promise<{ userResults: User[]; parsedPostResults: Post[] }> => {
  if (query.length < 2) {
    return { userResults: [], parsedPostResults: [] };
  }

  const response: { data: (User | Post)[] } = await snsApiClient(
    `search/all/${query}`
  );

  const userResults: User[] = [];
  const postResults: Post[] = [];

  response.data.forEach((result) => {
    if ('_id' in result && 'fullName' in result && 'email' in result) {
      userResults.push(result as User);
    } else {
      postResults.push(result as Post);
    }
  });

  const parsedPostResults = postResults.map((post: Post) => {
    const { title, content } = parsePostTitle(post.title);

    return { ...post, title, content };
  });

  return { userResults, parsedPostResults };
};

const useSearchAll = ({ query }: SearchAll) => {
  return useQuery({
    queryKey: ['SearchAll', query],
    queryFn: () => searchAll({ query }),
    retry: false,
    initialData: { userResults: [], parsedPostResults: [] },
    enabled: !!query
  });
};

export { useSearchAll };

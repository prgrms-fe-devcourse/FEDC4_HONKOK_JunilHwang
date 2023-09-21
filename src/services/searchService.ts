import { useQuery } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Post, User } from '~/types';

interface SearchAll {
  query: string;
}

const searchAll = async ({ query }: SearchAll): Promise<(User | Post)[]> => {
  const response = await snsApiClient(`search/all/${query}`);

  return response.data;
};

const useSearchAll = ({ query }: SearchAll) => {
  return useQuery({
    queryKey: ['SearchAll', query],
    queryFn: () => searchAll({ query }),
    retry: false,
    initialData: [],
    enabled: !!query
  });
};

export { useSearchAll };

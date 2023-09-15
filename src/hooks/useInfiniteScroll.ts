import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseInfiniteScrollProps<T> {
  fetchData: (pageParam: number) => Promise<T[]>;
}

const useInfiniteScroll = <T>({ fetchData }: UseInfiniteScrollProps<T>) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['posts'],
    ({ pageParam = 0 }) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) {
          return undefined;
        }

        return allPages.length;
      }
    }
  );

  useEffect(() => {
    let fetching = false;

    const onScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;

        if (hasNextPage) {
          await fetchNextPage().then(() => {
            fetching = false;
          });
        }
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  return { data };
};

export default useInfiniteScroll;

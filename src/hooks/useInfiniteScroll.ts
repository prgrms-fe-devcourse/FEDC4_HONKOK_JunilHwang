import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseInfiniteScrollProps<T> {
  fetchData: (pageParam: number) => Promise<T[]>;
}

const useInfiniteScroll = <T>({ fetchData }: UseInfiniteScrollProps<T>) => {
  const {
    data = { pages: [], pageParams: [] },
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(['posts'], ({ pageParam = 0 }) => fetchData(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      console.log('all', allPages);
      console.log('last', lastPage);

      let count = 0;

      allPages.forEach((page) => {
        count += page.length;
      });

      return count;
    }
  });

  useEffect(() => {
    let fetching = false;

    const onScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;

        if (hasNextPage) {
          console.log('끝!');
          await fetchNextPage().then(() => {
            fetching = false;
          });
        }
      }
    };

    const tempEl = document.querySelector('.temp')!; //채널페이지에만 주었다.
    tempEl.addEventListener('scroll', onScroll);

    return () => {
      tempEl.removeEventListener('scroll', onScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  return { data };
};

export default useInfiniteScroll;

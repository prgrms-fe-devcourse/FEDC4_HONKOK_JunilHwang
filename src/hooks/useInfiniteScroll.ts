import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps<T> {
  fetchData: (pageParam: number) => Promise<T[]>;
  queryKey: string;
}

const useInfiniteScroll = <T>({
  fetchData,
  queryKey
}: UseInfiniteScrollProps<T>) => {
  const {
    data = { pages: [], pageParams: [] },
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(
    ['posts', queryKey],
    ({ pageParam = 0 }) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 0
          ? undefined
          : allPages.reduce((total, page) => total + page.length, 0);
      },
      suspense: true
    }
  );

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const onIntersect = async (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        await fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(onIntersect, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return { data, ref };
};

export default useInfiniteScroll;

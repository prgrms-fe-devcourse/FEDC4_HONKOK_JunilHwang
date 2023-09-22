import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

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

      let count = 0;

      allPages.forEach((page) => {
        count += page.length;
      });

      return count;
    }
  });

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

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useInfiniteScroll = ({ fetchData }: any) => {
  const {
    data = { pages: [], pageParams: undefined },
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(['posts'], fetchData, {
    getNextPageParam: (_: any, allPages: string | any[]) => {
      return allPages.length;
    }
  });

  return {
    data: data.pages,
    hasNextPage,
    fetchNextPage
  };
};

export default useInfiniteScroll;

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const InfiniteScroll = ({ fetchData }: any) => {
  const {
    data = { pages: [], pageParams: undefined },
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(['posts'], fetchData, {
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length;
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
          await fetchNextPage();
        }
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div>
      <ul>
        {data.pages.map((page: any) =>
          page.map((item: any) => (
            <li
              key={item.id}
              style={{ marginBottom: '500px', fontSize: '20px' }}
            >
              {item.title}
            </li>
          ))
        )}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>페이지 불러오기</button>
      )}
    </div>
  );
};

export default InfiniteScroll;

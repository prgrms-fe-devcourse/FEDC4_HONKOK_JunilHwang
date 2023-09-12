import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

const useInfiniteScroll = ({ fetchData }: any) => {
  const {
    data = { pages: [], pageParams: undefined },
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['posts'], fetchData, {
    getNextPageParam: (_: any, allPages: string | any[]) => {
      return allPages.length
    },
  })

  useEffect(() => {
    let fetching = false
    const onScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true
        if (hasNextPage) {
          await fetchNextPage()
        }
        fetching = false
      }
    }

    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [hasNextPage, fetchNextPage])

  return {
    data: data.pages,
    hasNextPage,
    fetchNextPage,
  }
}

export default useInfiniteScroll

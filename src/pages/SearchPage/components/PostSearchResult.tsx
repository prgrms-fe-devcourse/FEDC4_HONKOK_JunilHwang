import { memo } from 'react';
import { PostList } from './index';
import { Exclamation } from '~/components/common/Exclamation';
import { Post } from '~/types';

interface PostSearchResultProps {
  parsedPostResults: Post[];
}

const PostSearchResult = memo(
  ({ parsedPostResults }: PostSearchResultProps) => {
    return (
      <section className="relative h-full w-full overflow-x-hidden">
        <section className="relative mb-6 flex flex-col justify-evenly overflow-hidden rounded-xl border-[1px] bg-white text-xs">
          <span className="px-4 py-2 text-sm">포스트</span>
          {parsedPostResults.length > 0 ? (
            <>
              <section className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
                <PostList parsedPostResults={parsedPostResults} />
              </section>
            </>
          ) : (
            <Exclamation className="mb-9 mt-4">
              <p className="text-[0.875rem] text-gray-400">
                검색 결과가 없습니다.
              </p>
            </Exclamation>
          )}
        </section>
      </section>
    );
  }
);

export default PostSearchResult;

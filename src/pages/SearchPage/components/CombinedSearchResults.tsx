import { memo } from 'react';
import { PostList, UserList } from './index';
import { Button } from '~/components/common';
import { Exclamation } from '~/components/common/Exclamation';
import { Post, User } from '~/types';

interface SearchAllInfoProps {
  userResults: User[];
  parsedPostResults: Post[];
  onClick: (selectedQuery: 'post' | 'user') => void;
}

const CombinedSearchResults = memo(
  ({ userResults, parsedPostResults, onClick }: SearchAllInfoProps) => {
    return (
      <section className="relative h-full w-full pb-8">
        <section className="relative mb-6 flex max-h-[1/2] flex-col justify-evenly overflow-hidden rounded-xl border-[1px] bg-white text-xs">
          <span className="px-4 py-2 text-sm">포스트</span>

          {parsedPostResults.length > 0 ? (
            <>
              <section className="flex h-full flex-col justify-evenly">
                <PostList slice={true} parsedPostResults={parsedPostResults} />
              </section>

              <Button
                size="xs"
                className="sticky bottom-0 left-0 w-full rounded-t-none bg-gray-400 text-white cs:p-2"
                onClick={() => onClick('post')}
              >
                더보기 {'>'}
              </Button>
            </>
          ) : (
            <Exclamation className="mb-9 mt-4">
              <p className="text-[0.875rem] text-gray-400">
                검색 결과가 없습니다.
              </p>
            </Exclamation>
          )}
        </section>

        <section className="relative mb-6 flex max-h-[1/2] flex-col justify-evenly overflow-hidden rounded-xl border-[1px] bg-white text-xs">
          <span className="px-4 py-2 text-sm">사용자</span>

          {userResults.length > 0 ? (
            <>
              <section className="flex h-full flex-col justify-evenly">
                <UserList slice={true} userResults={userResults} />
              </section>

              <Button
                size="xs"
                className="sticky bottom-0 left-0 w-full rounded-t-none bg-gray-400 text-white cs:p-2"
                onClick={() => onClick('user')}
              >
                더보기 {'>'}
              </Button>
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

export default CombinedSearchResults;

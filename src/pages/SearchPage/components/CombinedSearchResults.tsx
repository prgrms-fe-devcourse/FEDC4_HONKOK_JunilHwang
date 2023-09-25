import { PostList, UserList } from './index';
import { Button } from '~/components/common';
import { Post, User } from '~/types';

interface SearchAllInfoProps {
  userResults: User[];
  parsedPostResults: Post[];
  onClick: (selectedQuery: 'post' | 'user') => void;
}

const CombinedSearchResults = ({
  userResults,
  parsedPostResults,
  onClick
}: SearchAllInfoProps) => {
  return (
    <section className="relative h-full w-full pb-8">
      {!parsedPostResults.length && !userResults.length ? (
        <span className="flex h-full w-full items-center justify-center">
          {' '}
          결과 없음
        </span>
      ) : (
        <>
          {parsedPostResults.length > 0 && (
            <section className="relative mb-6 flex max-h-[1/2] flex-col justify-evenly overflow-hidden rounded-xl border-[1px]">
              <span className="px-4 pt-2 text-sm">포스트</span>
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
            </section>
          )}
          {userResults.length > 0 && (
            <section className="relative mb-6 flex max-h-[1/2] flex-col justify-evenly overflow-hidden rounded-xl border-[1px] text-xs">
              <span className="px-4 pt-2 text-sm">사용자</span>
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
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default CombinedSearchResults;

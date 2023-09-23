import { PostList } from './index';
import { Post } from '~/types';

interface PostSearchResultProps {
  parsedPostResults: Post[];
}

const PostSearchResult = ({ parsedPostResults }: PostSearchResultProps) => {
  return (
    <section className="relative h-full w-full overflow-hidden">
      {parsedPostResults.length > 0 && (
        <section className="relative mb-6 flex h-full flex-col justify-evenly overflow-hidden rounded-xl border-[1px]">
          <span className="px-4 pb-4 pt-2 text-sm">포스트</span>
          <section className="flex h-full flex-col gap-6 overflow-x-hidden overflow-y-scroll px-4">
            <PostList parsedPostResults={parsedPostResults} />
          </section>
        </section>
      )}
    </section>
  );
};

export default PostSearchResult;

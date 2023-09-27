import { Header, PostCardSkeleton } from '~/components/domain';

const LikeListSkeleton = () => {
  return (
    <div className="h-full">
      <Header leftArea="left-arrow">좋아요 목록</Header>
      <div className={`h-full bg-gray-100 p-6`}>
        <h2 className="mb-[0.62rem]">좋아요 누른 게시글</h2>

        <ul className="grid grid-cols-2 items-center justify-items-stretch gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LikeListSkeleton;

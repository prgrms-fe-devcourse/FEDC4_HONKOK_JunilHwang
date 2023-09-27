import { ProfileHeaderSkeleton } from './components';
import { Header, PostCardSkeleton } from '~/components/domain';

const ProfileSkeleton = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <Header rightArea={true} leftArea="left-arrow">
        {' '}
      </Header>

      <ProfileHeaderSkeleton />

      <div className="h-fit bg-gray-100 p-6">
        <h2 className="mb-[0.62rem]">작성한 글 보기</h2>

        <ul className="grid grid-cols-2 items-center justify-items-stretch gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

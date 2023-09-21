import ProfileHeader from './ProfileHeader';
import { Header, PostCard } from '~/components/domain';
import { useUser } from '~/hooks';
import { Post } from '~/types';

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) return null;

  console.log(user);

  return (
    <div className="h-full overflow-y-auto">
      <Header rightArea={true} leftArea="left-arrow">
        {user.fullName}
      </Header>
      <ProfileHeader />
      <div className={`p-6`}>
        <h2 className="mb-[0.62rem]">작성한 글 보기</h2>

        <ul className="grid grid-cols-2 items-center justify-items-stretch gap-6 sm:grid-cols-3 md:grid-cols-4">
          {user.posts.map((post: Post) => (
            <PostCard key={post._id} {...post} handleClick={() => {}} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;

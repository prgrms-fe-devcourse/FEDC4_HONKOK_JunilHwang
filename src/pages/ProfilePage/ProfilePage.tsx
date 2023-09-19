import ProfileHeader from './ProfileHeader';
import { Header, PostItem } from '~/components/domain';
import { useUser } from '~/hooks';
import { Post } from '~/types';

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <div className="h-full overflow-y-auto">
      <Header isHome={false} rightArea={true}>
        {user.fullName}
      </Header>
      <ProfileHeader />
      <div className="bg-gray-100">
        <div className="px-5 py-5">작성한 글 보기</div>
        <ul className="grid grid-cols-2 justify-items-center">
          {user.posts.map((post: Post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;

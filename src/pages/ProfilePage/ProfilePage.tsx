import ProfileHeader from './ProfileHeader';
import { Header, PostCard, PostList } from '~/components/domain';
import { useUser } from '~/hooks';
import { useGetUserPosts } from '~/services';

const ProfilePage = () => {
  const { user } = useUser();
  const { data: userPosts } = useGetUserPosts({ authorId: user._id, limit: 6 });

  console.log(user);

  return (
    <div className="infiniteScroll h-full overflow-y-auto">
      <Header rightArea={true} leftArea="left-arrow">
        {user.fullName}
      </Header>
      <ProfileHeader />
      <PostList
        title="작성한 글 보기"
        posts={userPosts}
        RenderComponent={(post) => (
          <PostCard {...post} handleClick={() => {}} />
        )}
      />
    </div>
  );
};

export default ProfilePage;

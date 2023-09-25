import { useNavigate, useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import { Header, PostCard, PostList } from '~/components/domain';
import { useUser } from '~/hooks';
import { useGetUserInfo, useGetUserPosts } from '~/services';
import { assert } from '~/utils';

const ProfilePage = () => {
  const { user } = useUser();

  const { userId } = useParams();
  const navigate = useNavigate();

  assert(userId);

  const { data: userInfo } = useGetUserInfo({ userId });
  const { data: userPosts, ref } = useGetUserPosts({
    authorId: userId,
    limit: 6
  });

  assert(userInfo);

  const myProfile = user?._id === userId;

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <Header rightArea={true} leftArea="left-arrow">
        {userInfo.fullName}
      </Header>

      <ProfileHeader {...userInfo} myProfile={myProfile} />
      <PostList
        ref={ref}
        title="작성한 글 보기"
        posts={userPosts}
        RenderComponent={(post) => (
          <PostCard
            {...post}
            handleClick={() => navigate(`/posts/${post._id}`)}
          />
        )}
        className="cs:h-fit"
      />
    </div>
  );
};

export default ProfilePage;

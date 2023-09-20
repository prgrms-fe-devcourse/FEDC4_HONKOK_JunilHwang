import ProfileHeader from './ProfileHeader';
import { Header, PostCard } from '~/components/domain';
import { useUser } from '~/hooks';
import { Post } from '~/types';

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="h-full overflow-y-auto">
      <Header rightArea={true} leftArea="left-arrow">
        {user.fullName}
      </Header>
      <ProfileHeader />
      <div className="bg-gray-100">
        <div className="px-5 py-5">작성한 글 보기</div>
        <ul className="grid grid-cols-2 justify-items-center">
          {user.posts.map((post: Post) => (
            <PostCard
              key={post._id}
              _id={post._id}
              channel={post.channel}
              comments={post.comments}
              createdAt={post.createdAt}
              likes={post.likes}
              title={post.title}
              content={post.content}
              image={post.image}
              handleClick={() => {}}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;

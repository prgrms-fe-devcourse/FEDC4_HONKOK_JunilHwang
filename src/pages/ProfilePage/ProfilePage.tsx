import ProfileHeader from './ProfileHeader';
import { Card, Image } from '~/components';
import { useUser } from '~/hooks';

const ProfilePage = () => {
  const { user } = useUser();

  const { posts } = user;

  return (
    <>
      <ProfileHeader />
      <div className="grid grid-cols-2 gap-10 p-3">
        {posts.map((post: any) => (
          <Card key={post._id}>
            <Image src={post.image} />
            <div>{post.title}</div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProfilePage;

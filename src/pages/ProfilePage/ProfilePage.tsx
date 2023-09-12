import ProfileHeader from './ProfileHeader';
import { Card, Image } from '~/components';
import { useUser } from '~/hooks';

const Profile = () => {
  const { user } = useUser();
  const { image, posts, followers, following } = user.user;

  return (
    <>
      <ProfileHeader
        image={image}
        posts={posts}
        followers={followers}
        following={following}
      />
      <div className="grid grid-cols-2 gap-10 p-3">
        {posts.map((post) => (
          <Card key={post._id}>
            <Image src={post.image} />
            <div>{post.title}</div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Profile;

import dayjs from 'dayjs';
import ProfileHeader from './ProfileHeader';
import { Image } from '~/components';
import { useUser } from '~/hooks';

const PostCard = ({ post }: { post: any }) => {
  const currentTime = dayjs();
  const createdAt = dayjs(post.createdAt);

  let formattedTime = '';

  const daysDiff = currentTime.diff(createdAt, 'day');
  const hoursDiff = currentTime.diff(createdAt, 'hour');
  const minutesDiff = currentTime.diff(createdAt, 'minute');
  const secondsDiff = currentTime.diff(createdAt, 'second');

  if (daysDiff > 0) {
    formattedTime = `${daysDiff}일 전`;
  } else if (hoursDiff > 0) {
    formattedTime = `${hoursDiff}시간 전`;
  } else if (minutesDiff > 0) {
    formattedTime = `${minutesDiff}분 전`;
  } else {
    formattedTime = `${secondsDiff}초 전`;
  }

  return (
    <div className="h-48 w-40">
      <Image className="h-28 w-full object-cover" src={post.image} />
      <div className="px-1">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {post.title}
        </div>
        <div className="flex justify-between">
          <div>{formattedTime}</div>
          <div className="flex gap-2">
            <div>👍 {post.likes.length}</div>
            <div>✏️ {post.comments.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useUser();
  const { posts } = user;

  return (
    <div className="h-full overflow-y-auto">
      <ProfileHeader />
      <div className="bg-gray-100">
        <div className="px-5 py-5">작성한 글 보기</div>
        <div className="grid grid-cols-2 justify-items-center">
          {posts.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

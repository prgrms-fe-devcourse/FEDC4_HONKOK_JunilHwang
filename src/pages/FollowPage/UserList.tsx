import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from '~/components/common';
import { useUser } from '~/hooks';
import {
  useCreateFollow,
  useCreateNotification,
  useDeleteFollow,
  useGetFollowInfo
} from '~/services';
import { Follow, User } from '~/types';

interface UserListProps {
  showFollowers: boolean;
  followList: Follow[];
}

const UserList = ({ showFollowers, followList }: UserListProps) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const { mutate: createFollow } = useCreateFollow();
  const { mutate: deleteFollow } = useDeleteFollow();
  const { mutate: createNotification } = useCreateNotification();

  const followUsers = useGetFollowInfo({ followList, showFollowers });

  const handleCreateFollow = (userId: string) => {
    createFollow(userId, {
      onSuccess: ({ data }) => {
        createNotification({
          notificationType: 'FOLLOW',
          notificationTypeId: data._id,
          userId
        });
      }
    });
  };

  const handleDeleteFollow = (follow: User) => {
    const matchFollow = follow.followers.find(
      (item) => item.follower === user._id
    );

    if (matchFollow) {
      const id = matchFollow._id;
      deleteFollow(id);
    }
  };

  const handleProfileClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <ul className="flex h-full flex-col gap-3 p-3">
      {followUsers.map(({ data: follow, isLoading }) => {
        return isLoading ? null : (
          <li
            key={follow!._id}
            className="flex items-center justify-between px-4 py-3"
          >
            <div
              className="flex flex-1 items-center gap-3"
              onClick={() => handleProfileClick(follow!._id)}
            >
              <Avatar
                src={follow!.image}
                size="medium"
                status={follow!.isOnline ? 'online' : 'offline'}
              />
              <div>{follow!.fullName}</div>
            </div>
            {user.following.some((i) => i.user === follow!._id) ? (
              <Button
                onClick={() => handleDeleteFollow(follow!)}
                theme="main"
                size="sm"
                variant="outline"
                className="w-28"
              >
                언팔로우
              </Button>
            ) : (
              <Button
                onClick={() => handleCreateFollow(follow!._id)}
                theme="main"
                size="sm"
                variant="solid"
                className="w-28"
              >
                팔로우
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;

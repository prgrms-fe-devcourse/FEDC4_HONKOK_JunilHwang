import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
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

const UserList = memo(({ showFollowers, followList }: UserListProps) => {
  const { user } = useUser();

  const { mutate: createFollow, isLoading: createFollowLoading } =
    useCreateFollow();
  const { mutate: deleteFollow, isLoading: deleteFollowLoading } =
    useDeleteFollow();
  const { mutate: createNotification } = useCreateNotification();

  const followUsers = useGetFollowInfo({ followList, showFollowers });

  const handleCreateFollow = useCallback(
    (userId: string) => {
      createFollow(userId, {
        onSuccess: ({ data }) => {
          createNotification({
            notificationType: 'FOLLOW',
            notificationTypeId: data._id,
            userId
          });
        }
      });
    },
    [createFollow, createNotification]
  );

  const handleDeleteFollow = useCallback(
    (follow: User) => {
      const matchFollow = follow.followers.find(
        (item) => item.follower === user?._id
      );

      if (matchFollow) {
        const id = matchFollow._id;
        deleteFollow(id);
      }
    },
    [deleteFollow, user?._id]
  );

  return (
    <ul className="flex h-full flex-col gap-3 p-3">
      {followUsers.map(({ data: follow, isLoading }) => {
        return isLoading ? null : (
          <li
            key={follow!._id}
            className="flex items-center justify-between px-4 py-3"
          >
            <Link
              className="flex flex-1 items-center gap-3"
              to={`/profile/${follow!._id}`}
            >
              <Avatar
                src={follow!.image}
                size="medium"
                status={follow!.isOnline ? 'online' : 'offline'}
              />
              <div className="text-gray-500">{follow!.fullName}</div>
            </Link>
            {user && follow?._id !== user?._id ? (
              user?.following.some((i) => i.user === follow!._id) ? (
                <Button
                  onClick={() => handleDeleteFollow(follow!)}
                  theme="main"
                  size="sm"
                  variant="outline"
                  className="w-28"
                  disabled={deleteFollowLoading || createFollowLoading}
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
                  disabled={deleteFollowLoading || createFollowLoading}
                >
                  팔로우
                </Button>
              )
            ) : null}
          </li>
        );
      })}
    </ul>
  );
});

export default UserList;

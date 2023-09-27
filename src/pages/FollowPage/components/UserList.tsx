import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '~/components/common';
import { Exclamation } from '~/components/common';
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

  if (followUsers.length === 0) {
    return (
      <Exclamation className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-[0.875rem] text-gray-400">
          {showFollowers
            ? '팔로우한 사람이 없습니다.'
            : '팔로잉한 사람이 없습니다.'}
        </p>
      </Exclamation>
    );
  }

  return (
    <ul className="flex h-full flex-col gap-3 p-3">
      {followUsers.map(({ data: follow, isLoading }) => {
        return isLoading ? (
          Array.from({ length: 4 }).map((_, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex flex-1 items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200"> </div>
                </div>
                <div className="box-content h-5 w-28 rounded-[0.625rem] bg-gray-200 p-2">
                  {' '}
                </div>
              </li>
            );
          })
        ) : (
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
              <p className="text-gray-500">{follow!.fullName}</p>
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

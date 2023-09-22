import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { snsApiClient } from '~/api';
import { Avatar, Button } from '~/components/common';
import { useUser } from '~/hooks';
import { useGetFollowInfo } from '~/services';
import { Follow, User } from '~/types';

interface UserListProps {
  showFollowers: boolean;
  followList: Follow[];
}

const UserList = ({ showFollowers, followList }: UserListProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useUser();

  const followUsers = useGetFollowInfo({ followList, showFollowers });

  const handleCreateFollow = async (userId: string) => {
    await snsApiClient.post('/follow/create', {
      userId
    });
    await queryClient.invalidateQueries(['user']);
  };

  const handleDeleteFollow = async (follow: User) => {
    const matchFollow = follow.followers.find(
      (item) => item.follower === user._id
    );

    if (matchFollow) {
      const id = matchFollow._id;
      await snsApiClient.delete('/follow/delete', {
        data: {
          id
        }
      });
      await queryClient.invalidateQueries(['user']);
    }
  };

  const handleProfileClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <ul>
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

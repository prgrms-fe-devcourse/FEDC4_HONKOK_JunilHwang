import { useQueries, useQueryClient } from '@tanstack/react-query';
import { snsApiClient } from '~/api';
import { Avatar, Button } from '~/components/common';
import { useUser } from '~/hooks';
import { getUserInfo } from '~/services';
import { User } from '~/types';

interface UserListProps {
  showFollowers: boolean;
}

const UserList = ({ showFollowers }: UserListProps) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const followList = showFollowers ? user.followers : user.following;

  const userInfoQueries = useQueries({
    queries: followList.map((follow) => {
      return {
        queryKey: [
          'userInfo',
          follow._id,
          showFollowers,
          follow.follower,
          follow.user
        ],
        queryFn: async () =>
          await getUserInfo({
            id: showFollowers ? follow.follower : follow.user
          })
      };
    })
  });

  const handleCreateFollow = async (userId: string) => {
    await snsApiClient.post('/follow/create', {
      userId
    });
    // updateUser({
    //   ...user,
    //   following: [...user.following, res.data]
    // });
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

      // updateUser({
      //   ...user,
      //   following: user.following.filter((item) => item._id !== res.data._id)
      // });
      await queryClient.invalidateQueries(['user']);
    }
  };

  return (
    <ul>
      {userInfoQueries.map(({ data: follow, isLoading }) => {
        return isLoading ? null : (
          <li
            key={follow._id}
            className="flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={follow.image}
                size="medium"
                status={follow.isOnline ? 'online' : 'offline'}
              />
              <div>{follow.fullName}</div>
            </div>
            {user.following.some((i) => i.user === follow._id) ? (
              <Button
                onClick={() => handleDeleteFollow(follow)}
                theme="main"
                size="sm"
                variant="outline"
                className="w-28"
              >
                언팔로우
              </Button>
            ) : (
              <Button
                onClick={() => handleCreateFollow(follow._id)}
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

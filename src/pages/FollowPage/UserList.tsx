import { Avatar, Button } from '~/components';

interface User {
  image: string;
  nickName: string;
  isOnline: boolean;
  isFollow: boolean;
}

interface UserListProps {
  userList: User[];
}

const UserList = ({ userList }: UserListProps) => {
  return (
    <ul>
      {userList.map((user: User) => (
        <li
          key={user.nickName}
          className="flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <Avatar
              src={user.image}
              size="medium"
              isOnline={user.isOnline ? 'online' : 'offline'}
            />
            <div>{user.nickName}</div>
          </div>
          {user.isFollow ? (
            <Button className="w-20 rounded-xl border-none py-2 text-white">
              언팔로우
            </Button>
          ) : (
            <Button className="border-main-base w-20 rounded-xl bg-white py-2 text-black">
              팔로우
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;

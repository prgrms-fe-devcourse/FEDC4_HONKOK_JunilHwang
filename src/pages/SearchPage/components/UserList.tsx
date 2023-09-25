import { Link } from 'react-router-dom';
import { PersonIcon } from '~/assets';
import { Image } from '~/components/common';
import { User } from '~/types';

interface UserListProps {
  slice?: boolean;
  userResults: User[];
}

const UserList = ({ slice = false, userResults }: UserListProps) => {
  const usersInfo = slice ? userResults.slice(0, 2) : userResults.slice();

  return usersInfo.map((user) => {
    return (
      <Link
        className="flex max-h-[3.75rem] w-full flex-grow items-center gap-4 px-4 py-3 hover:bg-gray-100"
        key={user._id}
        to={`/profile/${user._id}`}
      >
        {user.image ? (
          <Image
            className="max-h-[2.25rem] max-w-[2.25rem] cs:rounded-full"
            src={user.image}
            alt={user.image}
          />
        ) : (
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
            <PersonIcon className=" h-6 w-4 flex-shrink-0 fill-gray-300 stroke-none cs:rounded-full" />
          </div>
        )}

        <div className="flex flex-grow flex-col justify-center gap-1 ">
          <span className="line-clamp-1 overflow-hidden">{user.fullName}</span>
          <span className="text-gray-400">팔로워 {user.followers.length}</span>
        </div>
      </Link>
    );
  });
};

export default UserList;

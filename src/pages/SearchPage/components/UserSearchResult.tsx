import { UserList } from './index';
import { User } from '~/types';

interface UserSearchResultProps {
  userResults: User[];
}

const UserSearchResult = ({ userResults }: UserSearchResultProps) => {
  return (
    <section className="relative h-full w-full overflow-hidden">
      {userResults.length > 0 && (
        <section className="relative mb-6 flex h-full flex-col justify-evenly rounded-xl border-[1px] text-xs">
          <span className="px-4 pb-4 pt-2 text-sm">사용자</span>
          <section className="flex h-full flex-col gap-6 overflow-x-hidden overflow-y-scroll px-4">
            <UserList userResults={userResults} />
          </section>
        </section>
      )}
    </section>
  );
};

export default UserSearchResult;

import { UserList } from './index';
import { User } from '~/types';

interface UserSearchResultProps {
  userResults: User[];
}

const UserSearchResult = ({ userResults }: UserSearchResultProps) => {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <section className="relative mb-6 flex h-full flex-col justify-evenly rounded-xl border-[1px] text-xs">
        {userResults.length > 0 ? (
          <>
            <span className="px-4 py-2 text-sm">사용자</span>
            <section className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
              <UserList userResults={userResults} />
            </section>
          </>
        ) : (
          <span className="flex h-full w-full items-center justify-center text-base">
            결과 없음
          </span>
        )}
      </section>
    </section>
  );
};

export default UserSearchResult;

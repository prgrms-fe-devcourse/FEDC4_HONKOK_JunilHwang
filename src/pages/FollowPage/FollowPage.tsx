import { memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserList from './UserList';
import { Header } from '~/components/domain';

const FollowPage = memo(() => {
  const { state } = useLocation();
  const [showFollowers, setShowFollowers] = useState(
    state ? state.follow : true
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = event.target as HTMLButtonElement;
      if (target.value === 'follower') {
        setShowFollowers(true);
      } else {
        setShowFollowers(false);
      }
    },
    []
  );

  return (
    <div className="h-full bg-gray-100">
      <Header leftArea="left-arrow" rightArea={false}>
        팔로우
      </Header>
      <div
        className={`
          relative mb-3 flex border-b-2 border-gray-200 after:absolute after:-bottom-1 after:h-[5px] after:w-full after:scale-x-[0.45] after:rounded-full after:bg-main-base after:transition-all after:content-[""]
          ${
            showFollowers
              ? 'after:-translate-x-[25%]'
              : 'after:translate-x-[25%]'
          }
        `}
        onClick={handleClick}
      >
        <button value="follower" className={`h-full flex-1 py-3`}>
          팔로워
        </button>
        <button value="following" className={`h-full flex-1 py-3 `}>
          팔로잉
        </button>
      </div>
      <UserList
        showFollowers={showFollowers}
        followList={showFollowers ? state.followers : state.following}
      />
    </div>
  );
});

export default FollowPage;

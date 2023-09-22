import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserList from './UserList';
import { Header } from '~/components/domain';

const FollowPage = () => {
  const { state } = useLocation();
  const [showFollowers, setShowFollowers] = useState(
    state ? state.follow : true
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLButtonElement;
    if (target.value === 'follower') {
      setShowFollowers(true);
    } else {
      setShowFollowers(false);
    }
  };

  const activeButtonStyle =
    'after:absolute after:-bottom-1 after:left-0 after:h-[5px] after:w-full after:content-[""] after:bg-main-lighten after:rounded-md';

  return (
    <>
      <Header leftArea="left-arrow" rightArea={false}>
        팔로우
      </Header>
      <div
        className="mb-3 flex border-b-2 border-gray-200"
        onClick={handleClick}
      >
        <button
          value="follower"
          className={`relative h-full flex-1 py-3 ${
            showFollowers && activeButtonStyle
          }`}
        >
          팔로워
        </button>
        <button
          value="following"
          className={`relative h-full flex-1 py-3 ${
            !showFollowers && activeButtonStyle
          }`}
        >
          팔로잉
        </button>
      </div>
      <UserList
        showFollowers={showFollowers}
        followList={showFollowers ? state.followers : state.following}
      />
    </>
  );
};

export default FollowPage;

import { useState } from 'react';
import UserList from './UserList';

const MOCK_FOLLOWER = [
  {
    image:
      'https://image-notepet.akamaized.net/article/201711/fb_1fd99e59020f577c12a504c6da9669eb.jpg',
    nickName: '너구리',
    isOnline: true,
    isFollow: true
  },
  {
    image:
      'https://i.pinimg.com/236x/a2/3b/04/a23b045a0a3c9e7fed86472f21f48ed9.jpg',
    nickName: '비둘기',
    isOnline: false,
    isFollow: true
  },
  {
    image:
      'https://img.danawa.com/prod_img/500000/965/323/img/16323965_1.jpg?_v=20230222093241',
    nickName: '펩시제로',
    isOnline: true,
    isFollow: false
  },
  {
    image:
      'https://img.danawa.com/prod_img/500000/046/324/img/16324046_1.jpg?_v=20220204164529',
    nickName: '코카제로',
    isOnline: false,
    isFollow: false
  }
];

const MOCK_FOLLOWING = [
  {
    image:
      'https://company.lottechilsung.co.kr/common/images/product_view0108_bh3.jpg',
    nickName: '아이시스',
    isOnline: true,
    isFollow: true
  },
  {
    image:
      'https://img.danawa.com/prod_img/500000/530/153/img/15153530_1.jpg?_v=20210902124912',
    nickName: '삼다수',
    isOnline: false,
    isFollow: true
  },
  {
    image:
      'https://img.danawa.com/prod_img/500000/291/539/img/3539291_1.jpg?_v=20180508105511',
    nickName: '빠삐코',
    isOnline: true,
    isFollow: false
  },
  {
    image:
      'https://img.danawa.com/prod_img/500000/792/014/img/15014792_1.jpg?_v=20210817151140',
    nickName: '더블비얀코',
    isOnline: false,
    isFollow: false
  }
];

const FollowPage = () => {
  const [isFollower, setIsFollower] = useState(true);

  const handleClick = (event: any) => {
    if (event.target.value === 'follower') {
      setIsFollower(true);
    } else {
      setIsFollower(false);
    }
  };

  const activeButtonStyle =
    'after:absolute after:-bottom-1 after:left-0 after:h-[5px] after:w-full after:content-[""] after:bg-main-lighten after:rounded-md';

  return (
    <>
      <div
        className="mb-3 flex border-b-2 border-gray-200"
        onClick={handleClick}
      >
        <button
          value="follower"
          className={`relative h-full flex-1 py-3 ${
            isFollower && activeButtonStyle
          }`}
        >
          팔로워
        </button>
        <button
          value="following"
          className={`relative h-full flex-1 py-3 ${
            !isFollower && activeButtonStyle
          }`}
        >
          팔로잉
        </button>
      </div>
      <UserList userList={isFollower ? MOCK_FOLLOWER : MOCK_FOLLOWING} />
    </>
  );
};

export default FollowPage;

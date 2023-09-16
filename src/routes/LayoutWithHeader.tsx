import { useLocation, useNavigate } from 'react-router-dom';
import { BellIcon, HomeIcon, LeftArrowIcon, SearchIcon } from '~/assets';
import { Badge } from '~/components/common';

interface headerTitleProps {
  [key: string]: string;
}

const LayoutWithHeader = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToPage = (path: 'search' | 'notifications') => {
    navigate(path);
  };

  const headerTitle: headerTitleProps = {
    '/': '혼콕',
    '/posts': '게시글',
    '/post-edit': '글 작성하기'
  };

  const viewMenu = (path: string) => {
    const viewList = ['/', '/posts', '/post-edit'];

    return viewList.includes(path);
  };

  const location = useLocation();

  //api를 통해서 불러와야 할 것 같습니다
  const notifications = 3;

  console.log(viewMenu(location.pathname));

  return (
    <>
      <section className="relative flex h-28 w-full justify-center bg-main-lighten text-white">
        <h1 className="mt-14 inline-block text-xl font-bold">
          {headerTitle[location.pathname]}
        </h1>
        {location.pathname === '/' ? (
          <HomeIcon className="absolute left-6 top-14 h-6 w-6 stroke-white" />
        ) : (
          <LeftArrowIcon
            className="absolute left-6 top-14 h-6 w-6 fill-white"
            onClick={handleGoBack}
          />
        )}
        {viewMenu(location.pathname) && (
          <>
            <SearchIcon
              className="absolute right-16 top-14 h-6 w-6 stroke-white"
              onClick={() => handleGoToPage('search')}
            />
            <BellIcon
              className="absolute right-6 top-14 h-6 w-6 stroke-white"
              onClick={() => handleGoToPage('notifications')}
            />
            {notifications ? (
              <Badge className="absolute right-6 top-12 flex translate-x-1/4 translate-y-1/4 items-center justify-center border-none text-[10px] text-white cs:bg-active-base cs:px-1 cs:py-0">
                {notifications}
              </Badge>
            ) : undefined}
          </>
        )}
      </section>
    </>
  );
};

export default LayoutWithHeader;

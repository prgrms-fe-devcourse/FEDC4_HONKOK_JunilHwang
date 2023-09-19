import { useNavigate } from 'react-router-dom';
import { BellIcon, HomeIcon, LeftArrowIcon, SearchIcon } from '~/assets';
import { Badge } from '~/components/common';
import { useGetNotifications } from '~/services';

interface HeaderProps {
  leftArea?: 'home' | 'left-arrow';
  rightArea?: boolean;
}

const Header = ({
  leftArea = 'home',
  children,
  rightArea = true
}: React.PropsWithChildren<HeaderProps>) => {
  const navigate = useNavigate();
  const { data: notification } = useGetNotifications();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToPage = (path: 'search' | 'notifications') => {
    navigate(path);
  };

  return (
    <>
      <div className="h-28" />
      <article className="fixed left-1/2 top-0 z-50 mb-48 w-screen max-w-[767px] -translate-x-1/2">
        <section className="relative flex h-28 w-full justify-center bg-main-lighten text-white">
          <h1 className="mt-14 inline-block text-xl font-bold">{children}</h1>
          {leftArea === 'home' ? (
            <HomeIcon className="absolute left-6 top-14 h-6 w-6 stroke-white" />
          ) : (
            <LeftArrowIcon
              className="absolute left-6 top-14 h-6 w-6 fill-white"
              onClick={handleGoBack}
            />
          )}
          {rightArea && (
            <>
              <SearchIcon
                className="absolute right-16 top-14 h-6 w-6 stroke-white"
                onClick={() => handleGoToPage('search')}
              />
              <BellIcon
                className="absolute right-6 top-14 h-6 w-6 stroke-white"
                onClick={() => handleGoToPage('notifications')}
              />
              {notification.length !== 0 && (
                <Badge className="absolute right-6 top-12 flex translate-x-1/4 translate-y-1/4 items-center justify-center border-none text-[10px] text-white cs:bg-active-base cs:px-1 cs:py-0">
                  {notification.length}
                </Badge>
              )}
            </>
          )}
        </section>
      </article>
    </>
  );
};

export default Header;

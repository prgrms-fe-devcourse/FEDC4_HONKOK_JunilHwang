import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, LeftArrowIcon, SearchIcon } from '~/assets';
import { Badge, Button } from '~/components/common';
import { useUser, useUserNotifications } from '~/hooks';

interface HeaderProps {
  leftArea?: 'home' | 'left-arrow';
  rightArea?: boolean;
}

const Header = memo(
  ({
    leftArea = 'home',
    children,
    rightArea = true
  }: React.PropsWithChildren<HeaderProps>) => {
    const navigate = useNavigate();
    const notification = useUserNotifications();
    const { user } = useUser();

    const newNotification = notification.filter((item) => !item.seen);

    const handleGoBack = () => {
      navigate(-1);
    };

    return (
      <header className="fixed top-0 z-10 flex h-28 w-screen max-w-[767px] justify-center bg-main-lighten text-white">
        <h1 className="mt-14 inline-block text-xl">{children}</h1>
        {leftArea === 'home' ? (
          <span className="absolute left-6 top-[3.75rem] flex h-6 w-6 items-center justify-start stroke-white text-xl text-white">
            홈
          </span>
        ) : (
          <Button
            className="absolute left-6 top-[3.75rem] flex h-6 w-6 items-center justify-start cs:p-0"
            onClick={handleGoBack}
          >
            <LeftArrowIcon className="h-5 w-3 fill-white" />
          </Button>
        )}
        {rightArea && (
          <div className="absolute right-6 top-[3.75rem] flex gap-4">
            <Link to="/search">
              <SearchIcon className="h-6 w-6 stroke-white" />
            </Link>
            {user && (
              <Link to="/notifications">
                <BellIcon className="h-6 w-6 stroke-white" />
                {newNotification.length > 0 && (
                  <Badge className="absolute -top-1 right-[6px] flex translate-x-1/2 items-center justify-center border-none text-[10px] text-white cs:bg-active-base cs:px-1 cs:py-0">
                    {newNotification.length}
                  </Badge>
                )}
              </Link>
            )}
          </div>
        )}
      </header>
    );
  }
);

export default Header;

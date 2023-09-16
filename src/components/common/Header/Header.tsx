import { useNavigate } from 'react-router-dom';
import { BellIcon, HomeIcon, LeftArrowIcon, SearchIcon } from '~/assets';
import { Badge } from '~/components/common';

interface HeaderProps {
  main?: boolean;
  menu?: boolean;
  notification?: number;
}

const Header = ({
  main = false,
  children,
  menu = true,
  notification = 1
}: React.PropsWithChildren<HeaderProps>) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToPage = (path: 'search' | 'notification') => {
    navigate(path);
  };

  return (
    <section className="relative flex h-28 w-full justify-center bg-main-lighten text-white">
      <h1 className="mt-14 inline-block text-xl font-bold">{children}</h1>
      {main ? (
        <LeftArrowIcon
          className="absolute left-6 top-14 h-6 w-6 fill-white"
          onClick={handleGoBack}
        />
      ) : (
        <HomeIcon className="absolute left-6 top-14 h-6 w-6 stroke-white" />
      )}
      {menu && (
        <>
          <SearchIcon
            className="absolute right-16 top-14 h-6 w-6 stroke-white"
            onClick={() => handleGoToPage('search')}
          />
          <BellIcon
            className="absolute right-6 top-14 h-6 w-6 stroke-white"
            onClick={() => handleGoToPage('notification')}
          />
          {notification ? (
            <Badge className="absolute right-6 top-12 flex translate-x-1/4 translate-y-1/4 items-center justify-center border-none text-[10px] text-white cs:bg-active-base cs:px-1 cs:py-0">
              {notification}
            </Badge>
          ) : undefined}
        </>
      )}
    </section>
  );
};

export default Header;

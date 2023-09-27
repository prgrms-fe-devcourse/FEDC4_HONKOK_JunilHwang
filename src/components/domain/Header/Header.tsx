import { memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, useNavigate } from 'react-router-dom';
import Notification from './Notification';
import useDarkMode from './useDarkMode';
import { LeftArrowIcon, SearchIcon } from '~/assets';
import { Button } from '~/components/common';
import { useAuth } from '~/hooks';

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
    const { signOut } = useAuth();
    const [darkMode, toggleDarkMode] = useDarkMode();

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
            <button onClick={toggleDarkMode}>
              {darkMode ? 'light' : 'dark'}
            </button>
            <Link to="/search">
              <SearchIcon className="h-6 w-6 stroke-white" />
            </Link>
            <ErrorBoundary
              fallbackRender={() => {
                signOut();

                return <></>;
              }}
            >
              <Notification />
            </ErrorBoundary>
          </div>
        )}
      </header>
    );
  }
);

export default Header;

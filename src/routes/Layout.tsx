import { Outlet } from 'react-router-dom';
import { useUser } from '~/hooks';

const Layout = () => {
  const { userIsLoading } = useUser();

  if (userIsLoading) return;

  return (
    <div className="mx-auto max-w-[767px] font-OAGothic">
      <Outlet />
    </div>
  );
};

export default Layout;

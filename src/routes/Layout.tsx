import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="font-OAGothic mx-auto h-screen max-w-[24.375rem]">
      <Outlet />
    </div>
  );
};

export default Layout;

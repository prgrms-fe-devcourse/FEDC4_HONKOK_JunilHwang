import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="font-OAGothic mx-auto w-[24.375rem]">
      <Outlet />
    </div>
  );
};

export default Layout;

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="mx-auto w-[24.375rem]">
      <Outlet />
    </div>
  );
};

export default Layout;

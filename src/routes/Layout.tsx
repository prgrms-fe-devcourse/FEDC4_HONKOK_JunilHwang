import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="mx-auto w-[24.375rem] font-OAGothic">
      <Outlet />
    </div>
  );
};

export default Layout;

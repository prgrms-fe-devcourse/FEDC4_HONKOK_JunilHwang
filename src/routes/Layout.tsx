import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="mx-auto max-w-[767px] pb-24 font-OAGothic">
      <Outlet />
    </div>
  );
};

export default Layout;

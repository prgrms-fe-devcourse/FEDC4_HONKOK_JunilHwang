import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
  return (
    <div className="mx-auto h-screen max-w-[767px] bg-gray-100 font-OAGothic">
      <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default Layout;

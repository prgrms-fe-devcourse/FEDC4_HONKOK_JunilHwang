import { Outlet } from 'react-router-dom';
import LayoutWithHeader from './LayoutWithHeader';

const Layout = () => {
  return (
    <div className="mx-auto max-w-[767px] font-OAGothic">
      <Outlet />
    </div>
  );
};

export default Layout;

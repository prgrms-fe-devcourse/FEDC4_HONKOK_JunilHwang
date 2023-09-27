import { Outlet } from 'react-router-dom';
import { Footer } from '~/components/domain';

const LayoutWithFooter = () => {
  return (
    <div className="pb-24">
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutWithFooter;

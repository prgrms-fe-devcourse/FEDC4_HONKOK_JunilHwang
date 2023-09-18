import { Outlet } from 'react-router-dom';
import { Footer } from '~/components/domain';

const LayoutWithFooter = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWithFooter;

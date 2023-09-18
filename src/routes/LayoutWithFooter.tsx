import { Outlet } from 'react-router-dom';
import Footer from '~/components/domain/Footer/Footer';

const LayoutWithFooter = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWithFooter;

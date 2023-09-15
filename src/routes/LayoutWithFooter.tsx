import { Outlet } from 'react-router-dom';

const LayoutWithFooter = () => {
  return (
    <>
      <Outlet />
      <div>푸터`~~</div>
    </>
  );
};

export default LayoutWithFooter;

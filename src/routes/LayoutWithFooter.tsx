import { Outlet } from 'react-router-dom';

const LayoutWithFooter = () => {
  return (
    <div className="mx-auto h-screen max-w-[24.375rem] font-OAGothic">
      <Outlet />
      <div>푸터`~~</div>
    </div>
  );
};

export default LayoutWithFooter;

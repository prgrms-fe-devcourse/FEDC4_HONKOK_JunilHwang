import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import MenuItem from './MenuItem';

interface MenuProps {
  handleClose: () => void;
  portalTarget: Element | DocumentFragment;
  className?: string;
}

const Menu = ({
  handleClose,
  portalTarget,
  children,
  className
}: PropsWithChildren<MenuProps>) => {
  if (!portalTarget) return null;

  const defaults =
    'absolute z-40 rounded-lg bg-white py-3 shadow-md text-center';

  return (
    <div
      className="fixed left-0 top-0 z-30 h-full w-full"
      onClick={handleClose}
    >
      {createPortal(
        <ul className={`${defaults} ${className ?? ''}`}>{children}</ul>,
        portalTarget
      )}
    </div>
  );
};

Menu.Item = MenuItem;

export default Menu;

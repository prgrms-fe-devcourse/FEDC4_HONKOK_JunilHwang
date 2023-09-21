import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

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

  const defaults = 'fixed left-0 top-0 z-30 h-full w-full';

  return (
    <div className={`${defaults} ${className ?? ''}`} onClick={handleClose}>
      {createPortal(
        <ul className="absolute z-40 rounded-lg bg-white py-3 shadow-md">
          {children}
        </ul>,
        portalTarget
      )}
    </div>
  );
};

export default Menu;

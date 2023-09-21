import { PropsWithChildren } from 'react';

interface MenuItemProps {
  handleClick?: () => void;
  className?: string;
}

const MenuItem = ({
  children,
  handleClick = () => {},
  className
}: PropsWithChildren<MenuItemProps>) => {
  const defaults =
    'px-4 py-1 text-black hover:bg-gray-100 text-gray-500 text-sm';

  return (
    <li className={`${defaults} ${className ?? ''}`} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;

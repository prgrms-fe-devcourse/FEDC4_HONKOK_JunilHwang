import { HTMLAttributes, PropsWithChildren } from 'react';

interface ListProps extends HTMLAttributes<HTMLUListElement> {
  columns?: '1' | '2';
  className?: string;
}

interface ListItemProps extends HTMLAttributes<HTMLUListElement> {
  className?: string;
}

const columnsConfig = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2'
};

const BASE_BUTTON_CLASSES = 'mx-2 grid gap-2';

const List = ({
  className = '',
  children,
  columns = '2'
}: PropsWithChildren<ListProps>) => {
  return (
    <ul
      className={`${BASE_BUTTON_CLASSES} ${className} ${columnsConfig[columns]}`}
    >
      {children}
    </ul>
  );
};

const ListItem = ({
  className,
  children
}: PropsWithChildren<ListItemProps>) => {
  return <li className={`${className}`}>{children}</li>;
};

export { List, ListItem };

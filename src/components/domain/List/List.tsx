import { HTMLAttributes, PropsWithChildren } from 'react';
interface ListProps extends HTMLAttributes<HTMLUListElement> {
  column?: 1 | 2;
}

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {}

const columns = {
  1: 'grid-cols-1',
  2: 'grid-cols-2'
};

const defaults = 'mx-2 grid gap-2';

const List = ({
  children,
  column = 2,
  className,
  ...props
}: PropsWithChildren<ListProps>) => {
  return (
    <ul className={`${defaults} ${className} ${columns[column]}`} {...props}>
      {children}
    </ul>
  );
};

const ListItem = ({
  children,
  className,
  ...props
}: PropsWithChildren<ListItemProps>) => {
  return (
    <li className={`${className}`} {...props}>
      {children}
    </li>
  );
};

export { List, ListItem };

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
  ...props
}: PropsWithChildren<ListProps>) => {
  const { className, ...rest } = props;

  return (
    <ul className={`${defaults} ${className} ${columns[column]}`} {...rest}>
      {children}
    </ul>
  );
};

const ListItem = ({ children, ...props }: PropsWithChildren<ListItemProps>) => {
  const { className, ...rest } = props;

  return (
    <li className={`${className}`} {...rest}>
      {children}
    </li>
  );
};

export { List, ListItem };

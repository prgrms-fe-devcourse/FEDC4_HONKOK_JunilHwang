interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const BASE_BUTTON_CLASSES =
  'mx-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4';

const List = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<ListProps>) => {
  return (
    <ul {...props} className={`${BASE_BUTTON_CLASSES} ${className}`}>
      {children}
    </ul>
  );
};

const ListItem = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<ListItemProps>) => {
  return (
    <li {...props} className={className}>
      {children}
    </li>
  );
};

export { List, ListItem };

interface ListProps {
  children: React.ReactNode;
  columns?: '1' | '2' | '3';
  className?: string;
}

const columnsConfig = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3'
};

const List = ({ className, children, columns = '2' }: ListProps) => {
  return (
    <div className={`mx-2 grid gap-3 ${className} ${columnsConfig[columns]}`}>
      {children}
    </div>
  );
};

export default List;

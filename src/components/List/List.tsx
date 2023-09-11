interface ListProps {
  children: React.ReactNode;
  columns?: '1' | '2' | '3';
  className?: string;
}

const columnsConfig = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-[repeat(2,minmax(30vw,50vw))]',
  '3': 'grid-cols-[1fr_minmax(20vw,_2fr)_1fr]'
};

const List = ({ className, children, columns = '2' }: ListProps) => {
  return (
    <div className={`mx-2 grid gap-3 ${className} ${columnsConfig[columns]}`}>
      {children}
    </div>
  );
};

export default List;

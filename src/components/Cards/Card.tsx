interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'col';
}

const directionConfig = {
  row: 'flex-row',
  col: 'flex-col'
};

const Card = ({
  children,
  direction = 'col',
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={`flex ${directionConfig[direction]} h-fit w-fit gap-2 rounded-md border p-3 shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

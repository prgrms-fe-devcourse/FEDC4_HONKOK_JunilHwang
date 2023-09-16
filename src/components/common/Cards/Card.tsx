import { PropsWithChildren } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
}

const directions = {
  row: 'flex-row',
  col: 'flex-col'
};

const Card = ({
  children,
  direction = 'col',
  ...props
}: PropsWithChildren<CardProps>) => {
  const { className, ...rest } = props;

  return (
    <div
      className={`flex ${directions[direction]} h-fit w-fit gap-2 rounded-md border p-3 shadow-md ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

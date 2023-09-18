import { PropsWithChildren } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
}

const directions = {
  row: 'flex-row',
  col: 'flex-col'
};

/** @todo CardBody 만들기 */
const Card = ({
  children,
  direction = 'col',
  className,
  ...props
}: PropsWithChildren<CardProps>) => {
  const defualts = 'flex h-fit w-fit gap-2 rounded-md border p-3 shadow-md';

  return (
    <div
      className={`${defualts} ${directions[direction]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

import { PropsWithChildren } from 'react';

const CardTitle = ({ children }: PropsWithChildren) => {
  return <h1 className="font-medium">{children}</h1>;
};

export default CardTitle;

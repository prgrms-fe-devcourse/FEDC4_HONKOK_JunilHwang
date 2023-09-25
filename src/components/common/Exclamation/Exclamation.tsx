import { PropsWithChildren } from 'react';
import { ExclamationImage } from '~/assets';

interface ExclamationProps {
  className?: string;
}

const Exclamation = ({
  className,
  children
}: PropsWithChildren<ExclamationProps>) => {
  const defaults = 'flex flex-col items-center';

  return (
    <div className={`${defaults} ${className ?? ''}`}>
      <img src={ExclamationImage} alt="경고 아이콘" className="mb-4" />
      {children}
    </div>
  );
};

export default Exclamation;

import { PropsWithChildren } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizesConfig = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg'
};

const Badge = ({
  size = 'medium',
  children,
  className,
  ...props
}: PropsWithChildren<BadgeProps>) => {
  return (
    <div
      {...props}
      className={`absolute inline flex-grow-0 rounded-full bg-main-lighten ${sizesConfig[size]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Badge;

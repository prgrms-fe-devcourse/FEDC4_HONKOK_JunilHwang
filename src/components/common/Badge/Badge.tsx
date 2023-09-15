import { PropsWithChildren } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'channel' | 'selectedChannel' | 'primary';
  className?: string;
}

const typeStyleConfig = {
  default: 'bg-white text-gray-400 border-gray-200 border',
  channel: 'bg-gray-100 text-gray-500 ',
  selectedChannel: 'bg-active-lightest text-active-darken',
  primary: 'bg-white text-sub-red font-bold'
};

const Badge = ({
  type = 'default',
  children,
  className,
  ...props
}: PropsWithChildren<BadgeProps>) => {
  return (
    <span
      {...props}
      className={`box-border rounded-full p-1 px-2 text-[0.625rem] ${typeStyleConfig[type]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

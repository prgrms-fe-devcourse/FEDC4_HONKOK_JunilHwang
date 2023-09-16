import { PropsWithChildren } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'default' | 'channel' | 'selectedChannel' | 'primary';
}

const types = {
  default: 'bg-white text-gray-400 border-gray-200 border',
  channel: 'bg-gray-100 text-gray-500 ',
  selectedChannel: 'bg-active-lightest text-active-darken',
  primary: 'bg-white text-sub-red font-bold'
};

const Badge = ({
  type = 'default',
  children,
  ...props
}: PropsWithChildren<BadgeProps>) => {
  const { className, ...rest } = props;

  return (
    <span
      className={`rounded-full p-1 px-2 text-[0.625rem] ${types[type]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;

import { PropsWithChildren } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'outline' | 'solid' | 'subtle';
}

const Badge = ({
  variant = 'outline',
  children,
  ...props
}: PropsWithChildren<BadgeProps>) => {
  const { className, ...rest } = props;

  const variants = {
    outline: 'bg-white text-gray-400 border-gray-200 border',
    solid: 'bg-gray-100 text-gray-500',
    subtle: 'bg-active-lightest text-active-darken'
  };

  const defaults = 'rounded-full p-1 px-2 text-[0.625rem]';

  return (
    <span className={`${defaults} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </span>
  );
};

export default Badge;

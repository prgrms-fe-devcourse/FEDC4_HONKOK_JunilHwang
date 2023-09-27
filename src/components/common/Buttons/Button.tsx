import { PropsWithChildren } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'main' | 'active' | 'default';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
}

export const Button = ({
  theme = 'default',
  size = 'md',
  variant = 'solid',
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const solid = {
    main: 'bg-main-base text-white hover:bg-main-lighten active:bg-main-base',
    active: 'bg-active-base text-white hover:bg-active-darken',
    default: ''
  };

  const outline = {
    main: 'bg-white border-[1.5px] border-gray-300 text-main-darken hover:bg-gray-100 active:bg-gray-200',
    active:
      'bg-white border-[1.5px] border-active-base text-active-darken hover:bg-active-lighten',
    default: ''
  };

  const variants = {
    solid: solid[theme],
    outline: outline[theme]
  };

  const defaults = 'p-[0.5rem] rounded-[0.625rem] min-w-fit transition';

  return (
    <button
      className={`${defaults} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

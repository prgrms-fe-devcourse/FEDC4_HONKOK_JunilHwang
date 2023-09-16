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
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const { className, ...rest } = props;

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const solid = {
    main: 'bg-main-base text-white hover:bg-main-darken',
    active: 'bg-active-base text-white hover:bg-active-darken',
    default: ''
  };

  const outline = {
    main: 'bg-transparent border-[1px] border-main-base text-main-darken hover:bg-main-lighten',
    active:
      'bg-transparent border-[1px] border-active-base text-active-darken hover:bg-active-lighten',
    default: ''
  };

  const variants = {
    solid: solid[theme],
    outline: outline[theme]
  };

  const defaults = 'p-[0.5rem] rounded-[0.625rem] transition';

  return (
    <button
      className={`${defaults} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
import { PropsWithChildren } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const Button = ({
  bgColor = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-xl'
  };

  const color = {
    primary: 'bg-main-lighten',
    secondary: 'bg-main-darken'
  };

  const buttonDefaultStyle =
    'border-2 px-2 py-1 cursor-pointer inline-block leading-1';

  return (
    <button
      className={`${textSizes[size]} ${color[bgColor]} ${buttonDefaultStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

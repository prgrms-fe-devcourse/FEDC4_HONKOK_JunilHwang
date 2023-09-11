interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  bgColor = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}: ButtonProps) => {
  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-xl'
  };

  const color = {
    primary: 'bg-primary',
    secondary: 'bg-secondary'
  };

  const buttonDefaultStyle =
    'font-semibold border-2 px-2 py-1 cursor-pointer inline-block leading-1';

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

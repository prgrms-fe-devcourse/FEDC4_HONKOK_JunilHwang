interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  borderRadiusProp?: 'lv0' | 'lv1' | 'lv2' | 'lv3';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  bgColor = 'primary',
  size = 'medium',
  borderRadiusProp = 'lv0',
  className,
  children,
  ...props
}: ButtonProps) => {
  const borderRadius = {
    lv0: 'rounded-lg',
    lv1: 'rounded-xl',
    lv2: 'rounded-2xl',
    lv3: 'rounded-full'
  };
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
    'font-semibold border-2 p-3 cursor-pointer inline-block leading-1';

  return (
    <button
      className={`${textSizes[size]} ${color[bgColor]} ${buttonDefaultStyle} ${borderRadius[borderRadiusProp]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

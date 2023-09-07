interface ButtonProps {
  type?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({
  type = 'primary',
  size = 'medium',
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
    'font-semibold border-2 p-3 rounded-lg cursor-pointer inline-block leading-1';

  return (
    <button
      type="button"
      className={`${textSizes[size]} ${color[type]} ${buttonDefaultStyle}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

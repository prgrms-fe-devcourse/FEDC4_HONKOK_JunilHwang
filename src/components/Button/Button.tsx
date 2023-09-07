interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  label = 'BUTTON',
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    'font-semibold border-2 p-3 rounded-lg cursor-pointer inline-block leading-1',
    size === 'small' ? 'text-xs' : '',
    size === 'medium' ? 'text-sm' : '',
    size === 'large' ? 'text-base' : '',
    primary ? 'bg-primary' : 'bg-secondary'
  ].join(' ');

  return (
    <button type="button" className={buttonClasses} {...props}>
      {label}
    </button>
  );
};

export default Button;

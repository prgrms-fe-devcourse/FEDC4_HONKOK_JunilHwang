import { Icon } from '~/components';
type IconNameProps = 'heart' | 'search';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: IconNameProps;
  size: number;
  color?: string;
  className?: string;
}

export const IconButton = ({
  name,
  size,
  color,
  className,
  ...props
}: IconButtonProps) => {
  const defaultStyle =
    'inline-block w-auto rounded-full border-[2px] border-black bg-white p-2';
  return (
    <button className={`${defaultStyle} ${className}`} {...props}>
      <Icon name={name} size={size} color={color} />
    </button>
  );
};

export default IconButton;

import { Icon } from '~/components';
type IconName = 'heart' | 'search'; //중복되어 사용되어 type을 정리 할 수 있는 폴더가 필요해 보임

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: IconName;
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

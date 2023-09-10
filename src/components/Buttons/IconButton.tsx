import { Icon } from '../Icon';
type iconName = 'heart' | 'search'; //중복되어 사용되어 type을 정리 할 수 있는 폴더가 필요해 보임

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: iconName;
  size: number;
  color?: string;
  areaLabel: string;
  className?: string;
  handleOnClick?: () => void;
}

export const IconButton = ({
  name,
  size,
  color,
  areaLabel,
  className,
  handleOnClick
}: IconButtonProps) => {
  const defaultStyle =
    'inline-block w-auto rounded-full border-4 border-black bg-white p-2';
  return (
    <button
      className={`${className} ${defaultStyle}`}
      aria-label={areaLabel}
      onClick={(event) => {
        event.preventDefault();
        handleOnClick && handleOnClick();
      }}
    >
      <Icon name={name} size={size} color={color} />
    </button>
  );
};

export default IconButton;

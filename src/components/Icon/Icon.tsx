import { IconSet } from '.';
type IconName = 'heart' | 'search';

interface IconProps {
  name: IconName;
  size: number;
  color?: string;
}

const Icon = ({ name, size = 16, color }: IconProps) => {
  const icon = IconSet[name];

  if (!icon) {
    return null;
  }

  return (
    <svg
      viewBox={IconSet[name].viewBox}
      fill={color || icon.fill}
      width={size}
      height={size}
    >
      <path d={icon.path} />
    </svg>
  );
};

export default Icon;

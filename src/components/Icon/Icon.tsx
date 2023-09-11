import { IconSet } from '.';
type IconNameProps = 'heart' | 'search';

interface IconProps {
  name: IconNameProps;
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
      viewBox={icon.viewBox}
      fill={color || icon.fill}
      width={size}
      height={size}
    >
      <path d={icon.path} />
    </svg>
  );
};

export default Icon;

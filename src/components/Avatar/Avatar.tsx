import { ImgHTMLAttributes } from 'react';
import { BlankBadge } from '~/components';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: 'small' | 'medium' | 'large';
  isOnline?: 'none' | 'online' | 'offline';
  className?: string;
}

const sizesConfig = {
  small: 'w-10 h-10',
  medium: 'w-12 h-12',
  large: 'w-14 h-14'
};

const onlineConfig = {
  online: 'bg-primary',
  offline: 'bg-gray-400'
};

const Avatar = ({
  size,
  isOnline = 'none',
  className,
  ...props
}: AvatarProps) => {
  return (
    <div className="relative inline-block">
      <img
        {...props}
        className={`${sizesConfig[size]} rounded-full ${className}`}
      />
      {isOnline !== 'none' && (
        <BlankBadge
          className={`cs:w-3 left-0 top-0 ${onlineConfig[isOnline]}`}
        />
      )}
    </div>
  );
};

export default Avatar;

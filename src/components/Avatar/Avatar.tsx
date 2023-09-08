import { ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: 'small' | 'medium' | 'large';
  src: string;
  alt?: string;
  isOnline?: 'none' | 'online' | 'offline';
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
  src,
  alt = '',
  isOnline = 'none',
  ...props
}: AvatarProps) => {
  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        {...props}
        className={`${sizesConfig[size]} rounded-full`}
      />
      {isOnline !== 'none' && (
        <div
          className={`absolute left-0 top-0 h-3 w-3 rounded-full ${onlineConfig[isOnline]}`}
        />
      )}
    </div>
  );
};

export default Avatar;

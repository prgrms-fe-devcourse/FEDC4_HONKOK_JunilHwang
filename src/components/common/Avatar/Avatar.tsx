import { memo } from 'react';
import DefaultProfile from '~/assets/images/profile.png';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  status?: 'none' | 'online' | 'offline';
}

const sizes = {
  small: 'w-10 h-10',
  medium: 'w-12 h-12',
  large: 'w-14 h-14',
  extraLarge: 'w-16 h-16'
};

const badgeSizes = {
  small: 'w-2 h-2 bottom-[0.1rem] right-[0.1rem]',
  medium: 'w-3 h-3 bottom-[0.01rem] right-[0.01rem]',
  large: 'w-4 h-4 bottom-0 right-0',
  extraLarge: 'w-4 h-4 bottom-0 right-0'
};

const statuses = {
  online: 'bg-sub-lime',
  offline: 'bg-gray-300'
};

const containerDefaults = 'relative inline-block flex-shrink-0';

const imageBoxDefaults =
  'overflow-hidden rounded-full border-[1.5px] border-gray-600';
const imageDefaults = 'object-cover';
const statusDefaults = 'absolute rounded-full';

const Avatar = memo(
  ({
    size = 'medium',
    status = 'none',
    src = DefaultProfile,
    className,
    ...props
  }: AvatarProps) => {
    return (
      <div className={`${containerDefaults}`}>
        <div className={`${imageBoxDefaults} ${sizes[size]}`}>
          <img
            className={`${imageDefaults} ${sizes[size]} ${className}`}
            src={src}
            {...props}
          />
        </div>

        {status !== 'none' && (
          <div
            className={`${statusDefaults} ${badgeSizes[size]} ${statuses[status]}`}
          />
        )}
      </div>
    );
  }
);

export default Avatar;

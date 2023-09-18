interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'small' | 'medium' | 'large';
  status?: 'none' | 'online' | 'offline';
}

const sizes = {
  small: 'w-10 h-10',
  medium: 'w-12 h-12',
  large: 'w-14 h-14'
};

const badgeSizes = {
  small: 'w-2 h-2 bottom-[0.1rem] right-[0.1rem]',
  medium: 'w-3 h-3 bottom-[0.01rem] right-[0.01rem]',
  large: 'w-4 h-4 bottom-0 right-0'
};

const statuses = {
  online: 'bg-sub-lime',
  offline: 'bg-gray-300'
};

const containerDefaults =
  'relative inline-block flex-shrink-0 overflow-hidden rounded-full border-[1px] border-gray-100 bg-teal-300';

const imageDefaults = 'object-cover';

const Avatar = ({
  size = 'medium',
  status = 'none',
  className,
  ...props
}: AvatarProps) => {
  return (
    <div className={`${containerDefaults} ${sizes[size]}`}>
      <img
        className={`${imageDefaults} ${sizes[size]} ${className}`}
        {...props}
      />

      {status !== 'none' && (
        <div
          className={`absolute rounded-full ${badgeSizes[size]} ${statuses[status]}`}
        />
      )}
    </div>
  );
};

export default Avatar;

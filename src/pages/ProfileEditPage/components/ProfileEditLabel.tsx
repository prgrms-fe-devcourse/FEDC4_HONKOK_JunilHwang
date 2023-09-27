import { memo } from 'react';

const ProfileEditLabel = memo(
  ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
      <label className="mr-5 w-12 text-left text-xs text-gray-400" {...props}>
        {children}
      </label>
    );
  }
);

export default ProfileEditLabel;

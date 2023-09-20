const ProfileEditWrapper = ({
  children,
  className
}: React.HTMLAttributes<React.PropsWithChildren>) => {
  return (
    <div
      className={`flex w-full items-center border-b-2 border-gray-200 py-3 ${className}`}
    >
      {children}
    </div>
  );
};

export default ProfileEditWrapper;

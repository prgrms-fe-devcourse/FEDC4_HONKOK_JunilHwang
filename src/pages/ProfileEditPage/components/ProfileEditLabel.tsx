const ProfileEditLabel = ({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className="mr-5 w-12 text-center text-xs text-gray-400" {...props}>
      {children}
    </label>
  );
};

export default ProfileEditLabel;

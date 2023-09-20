const ProfileEditLabel = ({
  htmlFor,
  children
}: React.LabelHTMLAttributes<React.PropsWithChildren>) => {
  return (
    <label
      htmlFor={htmlFor}
      className="mr-5 w-12 text-center text-xs text-gray-400"
    >
      {children}
    </label>
  );
};

export default ProfileEditLabel;

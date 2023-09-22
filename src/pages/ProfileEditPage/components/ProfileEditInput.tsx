const ProfileEditInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <input
      {...props}
      className="w-24 flex-1 bg-transparent p-2 focus:outline-main-base"
    />
  );
};

export default ProfileEditInput;

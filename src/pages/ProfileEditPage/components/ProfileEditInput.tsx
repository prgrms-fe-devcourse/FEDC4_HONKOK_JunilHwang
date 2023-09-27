const ProfileEditInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <input
      {...props}
      className="w-24 flex-1 bg-transparent p-2 pr-10 focus:outline-none"
    />
  );
};

export default ProfileEditInput;

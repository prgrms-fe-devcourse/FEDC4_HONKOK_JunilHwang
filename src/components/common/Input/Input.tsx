interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, ...props }: InputProps) => {
  const defaults =
    'rounded-[0.625rem] border-[1.5px] border-gray-200 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base';

  return <input className={`${defaults} ${className}`} {...props} />;
};

export default Input;

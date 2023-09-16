interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ type, ...props }: InputProps) => {
  const { className, ...rest } = props;

  return (
    <input className={`border bg-white px-2 py-1 ${className}`} {...rest} />
  );
};

export default Input;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ type, className, ...props }: InputProps) => {
  return (
    <input className={`border bg-white px-2 py-1 ${className}`} {...props} />
  );
};

export default Input;

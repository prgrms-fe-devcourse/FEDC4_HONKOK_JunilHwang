interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ type, ...props }: InputProps) => {
  const { className, ...rest } = props;

  const defaults = 'border bg-white px-2 py-1 focus:outline-none';

  return <input className={`${defaults} ${className}`} {...rest} />;
};

export default Input;

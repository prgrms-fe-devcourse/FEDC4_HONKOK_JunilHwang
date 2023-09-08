import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = ({ onChange, type, className, ...props }: InputProps) => {
  return (
    <input
      onChange={onChange}
      className={`h-6 border bg-white p-4 ${className}`}
      {...props}
    />
  );
};

export default Input;

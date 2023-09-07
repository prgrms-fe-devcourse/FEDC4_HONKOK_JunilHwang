import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: () => void;
  type?: string;
}

const Input = ({ onChange, type, ...props }: InputProps) => {
  return (
    <input
      {...props}
      type={type}
      onChange={onChange}
      className="h-6  border bg-white p-4 "
    />
  );
};

export default Input;

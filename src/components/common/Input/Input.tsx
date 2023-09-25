import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }: InputProps, ref) => {
    const defaults =
      'rounded-[0.625rem] border-[1.5px] border-gray-600 pb-[0.56rem] pl-[0.87rem] pt-[0.5rem] placeholder:text-gray-200 focus:outline-main-base';

    return (
      <input ref={ref} className={`${defaults} ${className}`} {...props} />
    );
  }
);

export default Input;

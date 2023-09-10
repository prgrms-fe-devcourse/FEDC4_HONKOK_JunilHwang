import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseProps {
  className?: string;
  component?: 'input' | 'textarea';
}
interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {}
interface TextareaProps
  extends BaseProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Input = ({
  component = 'input',
  className,
  ...props
}: InputProps | TextareaProps) => {
  if (component === 'input') {
    return (
      <input
        className={`h-6 border bg-white p-4 ${className}`}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  } else if (component === 'textarea') {
    return (
      <textarea
        className={` h-[40vh] w-[100%] resize-none rounded-lg border bg-white p-4  ${className}`}
        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }
};

export default Input;

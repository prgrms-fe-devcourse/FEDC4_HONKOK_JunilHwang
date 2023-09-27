import { useEffect } from 'react';
import { useToast } from './ToastProvider';

interface ToastProps {
  id: string;
  children: React.ReactNode;
}

const Toast = ({ id, children }: ToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      removeToast({ id });
    }, 2000);
  }, [id, removeToast]);

  return (
    <div
      id={id}
      className="rounded-[0.625rem] border-[1.5px] bg-white px-12 py-2"
    >
      <button onClick={() => removeToast({ id })}>{children}</button>
    </div>
  );
};

export default Toast;

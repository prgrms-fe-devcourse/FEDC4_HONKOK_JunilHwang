import { useToast } from './ToastProvider';

interface ToastProps {
  id: string;
  children: React.ReactNode;
}

const Toast = ({ id, children }: ToastProps) => {
  const { removeToast } = useToast();

  return (
    <div
      id={id}
      className="absolute right-0 flex flex-col rounded-[0.625rem] border-[1.5px] px-12 py-2"
    >
      {children}
      <button onClick={() => removeToast({ id })}>삭제</button>
    </div>
  );
};

export default Toast;

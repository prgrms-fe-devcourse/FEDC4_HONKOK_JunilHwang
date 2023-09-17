import { useToast } from './ToastProvider';

interface ToastProps {
  id: string;
  children: React.ReactNode;
}

const Toast = ({ id, children }: ToastProps) => {
  const { removeToast } = useToast();

  return (
    <div id={id}>
      {children}
      <button onClick={() => removeToast({ id })}>삭제!</button>
    </div>
  );
};

export default Toast;

import { createPortal } from 'react-dom';
import Toast from './Toast';

export interface ToastContainerProps {
  toasts: { id: string; content: string }[];
}

const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return createPortal(
    <div className="fixed bottom-0 left-1/2 z-50 flex w-full -translate-x-1/2 flex-col gap-2 lg:w-fit">
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id}>
          {toast.content}
        </Toast>
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;

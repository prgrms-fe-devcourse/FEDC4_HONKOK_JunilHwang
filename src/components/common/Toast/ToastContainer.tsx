import { createPortal } from 'react-dom';
import Toast from './Toast';

export interface ToastContainerProps {
  toasts: { id: string; content: string }[];
}

const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return createPortal(
    <div className="absolute right-0 top-0 z-50">
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

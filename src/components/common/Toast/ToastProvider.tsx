import { createContext, useContext, useState } from 'react';
import ToastContainer from './ToastContainer';
import { generateRandomId } from './util';

interface ToastContextType {
  addToast: ({ content }: { content: string }) => void;
  removeToast: ({ id }: { id: string }) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error('useToast는 ToastProvider 내부에서 사용해야 합니다!');
  }

  return toast;
};

const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [toasts, setToasts] = useState<{ id: string; content: string }[]>([]);

  const addToast = ({ content }: { content: string }) => {
    setToasts((prev) => [...prev, { id: generateRandomId(), content }]);
  };

  const removeToast = ({ id }: { id: string }) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  modalOpened: boolean;
  handleClose: () => void;
}

const Modal = ({
  modalOpened,
  handleClose,
  children
}: PropsWithChildren<ModalProps>) => {
  if (!modalOpened) {
    return null;
  }

  const modalRoot = document.getElementById('modal');

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div>
      <div className="z-2 fixed bottom-0 left-0 right-0 top-0 bg-black bg-opacity-30" />
      <div className="z-3 fixed left-1/2 top-1/2 h-[27.375rem] w-[21.375rem] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white p-4">
        <div className="relative p-2">
          <span className="absolute right-[0.5rem] " onClick={handleClose}>
            X
          </span>
          <div className="absolute top-[5rem]">{children}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

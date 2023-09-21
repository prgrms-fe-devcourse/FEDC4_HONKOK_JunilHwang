import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '~/assets';

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
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-black bg-opacity-30"
        onClick={handleClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 flex w-fit min-w-[19rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-2xl bg-white p-4">
        <CloseIcon className="z-50 self-end" onClick={handleClose} />
        <div className="relative h-full flex-grow p-2">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

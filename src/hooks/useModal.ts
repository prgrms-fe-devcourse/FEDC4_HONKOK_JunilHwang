import { useState, useCallback } from 'react';

function useModal() {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = useCallback(() => {
    if (modalOpened) return;
    setModalOpened(true);
  }, [modalOpened]);

  const closeModal = useCallback(() => {
    setModalOpened(false);
  }, []);

  return {
    modalOpened,
    openModal,
    closeModal
  };
}

export default useModal;

import { useState } from "react";

function useModal() {
  const [isModal, setIsModal] = useState(false);

  const openModal = (typeOfModal) => {
    if (typeOfModal) {
      setIsModal(typeOfModal);
      return;
    }
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return { isModal, openModal, closeModal };
}

export default useModal;

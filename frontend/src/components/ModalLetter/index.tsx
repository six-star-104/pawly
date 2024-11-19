import React, { ReactNode, useEffect, useState } from "react";
import * as style from "./ModalLetter.style";

interface ModalLetterProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalLetter: React.FC<ModalLetterProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      css={[
        style.modalOverlay,
        isOpen ? style.modalOverlayOpen : style.modalOverlay,
      ]}
      onClick={onClose}
    >
      <div
        css={[
          style.modalContent,
          isOpen ? style.modalContentOpen : style.modalContent,
        ]}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLetter;

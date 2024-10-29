/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "./Modal.type";
import { modalStyles } from "./Modal.style";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen && !isAnimating) return null;

  return ReactDOM.createPortal(
    <div
      css={modalStyles.modalOverlayStyle(isOpen)}
      onClick={handleOverlayClick}
    >
      <div css={modalStyles.modalContentStyle(isOpen)}>
        <div css={modalStyles.modalHeaderStyle}>
          {title && <div css={modalStyles.modalTitleStyle}>{title}</div>}
          <button css={modalStyles.closeButtonStyle} onClick={onClose}>
            &times;
          </button>
        </div>
        <div css={modalStyles.modalBodyStyle}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

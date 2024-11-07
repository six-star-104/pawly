/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "./Modal.type";
import { modalStyles } from "./Modal.style";
import { useRef } from "react";
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

  // 바로 클릭되면 모달꺼지게 만들면, 원래창에서 롱 클릭 이벤트시 자꾸 거져서 아래 로직으로 변경
  // const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   }
  // };

  const timerRef = useRef<number | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (e.target === overlayRef.current) {
      timerRef.current = window.setTimeout(() => {
        onClose();
      }, 10);
    }
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  if (!isOpen && !isAnimating) return null;

  return ReactDOM.createPortal(
    <div
      css={modalStyles.modalOverlayStyle(isOpen)}
      // onClick={handleOverlayClick}
      ref={overlayRef}
      // 모바일용
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      // pc 테스트용
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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

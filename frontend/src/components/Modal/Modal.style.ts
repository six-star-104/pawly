/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const modalOverlayStyle = (isOpen: boolean) => css`
  display: ${isOpen ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;

  background-color: rgba(0, 0, 0, 0.5);
  animation: ${isOpen ? fadeIn : fadeOut} 0.2s
    ${isOpen ? "ease-out" : "ease-in"} forwards;
`;

const modalContentStyle = (isOpen: boolean) => css`
  position: relative;

  // 노트북 & 테블릿 가로 (해상도 1024px ~ )
  @media all and (min-width: 1024px) {
    width: 42vh;
  }

  // 테블릿 가로 (해상도 768px ~ 1023px)
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 42vh;
  }

  // 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px)
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 42vh;
  }

  // 모바일 세로 (해상도 ~ 479px)
  @media all and (max-width: 479px) {
    width: 90%;
  }

  
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${isOpen ? fadeIn : fadeOut} 0.2s
    ${isOpen ? "ease-out" : "ease-in"} forwards;
  padding: 16px;
`;

const modalHeaderStyle = (title:string | undefined)=>css`
  display: flex;
  justify-content: ${title? "space-between" : "end"};
  align-items: center;
  margin-bottom: 12px;
`;

const modalTitleStyle = css`
  font-size: 1.25rem;
  font-weight: bold;
`;

const closeButtonStyle =  css`
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const modalBodyStyle = css``;

export const modalStyles = {
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  modalTitleStyle,
  closeButtonStyle,
  modalBodyStyle,
};

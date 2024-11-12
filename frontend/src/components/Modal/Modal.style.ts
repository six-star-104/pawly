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
  width: auto;
  min-width: 300px;
  max-width: 90%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${isOpen ? fadeIn : fadeOut} 0.2s
    ${isOpen ? "ease-out" : "ease-in"} forwards;
`;

const modalHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1.5rem;
`;

const modalTitleStyle = css`
  font-size: 1.25rem;
  font-weight: bold;
`;

const closeButtonStyle = css`
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

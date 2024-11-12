import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: ${fadeOut} 0.2s forwards;
`;

export const modalOverlayOpen = css`
  animation: ${fadeIn} 0.2s forwards;
`;

export const modalContent = css`
  position: relative;
  background: #fefefe;
  max-width: 80%;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: ${fadeOut} 0.2s forwards;
`;

export const modalContentOpen = css`
  animation: ${fadeIn} 0.2s forwards;
`;

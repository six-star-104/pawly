import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const modalOverlay = (isOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: ${isOpen ? "auto" : "none"};
  z-index: 3000;
`;

export const modalContent = (isOpen: boolean) => css`
  background: white;
  padding: 20px;
  text-align: center;

  // 노트북 & 테블릿 가로 (해상도 1024px ~ )
  @media all and (min-width: 1024px) {
    width: 36vh;
  }

  // 테블릿 가로 (해상도 768px ~ 1023px)
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 36vh;
  }

  // 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px)
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 36vh;
  }

  // 모바일 세로 (해상도 ~ 479px)
  @media all and (max-width: 479px) {
    width: 75%;
  }
  max-width: 400px;
  transform: ${isOpen ? "scale(1)" : "scale(0.9)"};
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: ${isOpen ? 1 : 0};
`;

export const messageMain = css`
  margin-bottom: 0.5rem;
`;
export const messageWarn = css`
  width: 90%;
  margin: 0 auto;
  color: gray;
  font-size: 0.75rem;
`;
export const buttonContainer = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.25rem;
`;

export const Button = styled.button`
  padding: 0.25rem 0.5rem;
  box-shadow: 3px 0 0 0 black, -3px 0 0 0 black, 0 3px 0 0 black,
    0 -3px 0 0 black;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
`;
export const confirmButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
`;

export const cancelButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.gray};
`;

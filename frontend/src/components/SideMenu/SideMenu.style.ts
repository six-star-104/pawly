import { css, keyframes } from "@emotion/react";
const fadeIn = keyframes`
from {
  opacity:0;
    transform: translateX(100%);
  }
  to {
    opacity:1;
    transform: translateX(0%);
  }
`;

const fadeOut = keyframes`
  from {
  opacity:1;
    transform: translateX(0%);
  }
  to {
  opacity:0;
    transform: translateX(100%);
  }
`;

export const sideBarOverlay = (isOpen: boolean) => css`
  display: "flex";
  width: 100vw;
  // max-width:90%;
  height: 100vh;
  background-color: tranparent;
  // transform: translateX(100%);
  // transition: transform 0.3s ease;
  // z-index: 10;
  animation: ${isOpen ? fadeIn : fadeOut} ${isOpen ? "0.2s" : "0.1s"}
    ${isOpen ? "ease-out" : "ease-in"};
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  right: 0;

  z-index: 2000;
`;
export const containerStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  max-width: 90%;
  height: 100vh;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 3px solid black;
`;

export const headerStyle = css`
  background-color: #d1b3ff;
  padding: 0.5rem;
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 좌우 끝으로 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  font-weight: bold;
  font-size: 1.25rem;
  border-bottom: 1px solid black;
`;

export const menuListStyle = css`
  list-style: none;
  padding: 0;
  margin: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.5rem;
`;

export const menuItemStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const footerStyle = css`
  text-align: center;
  font-size: 0.75rem;
  color: #333;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  // margin-bottom: 24px;

  p {
    width: 100%;
    padding-top: 16px;
    // padding-bottom: 8px;
    border-top: 1px solid black;
  }
  padding-top: 10px;
`;

import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  background-image: none;
`;

export const backButton = css`
  position: fixed;
  left: 3%;
  top: 3%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background-color: transparent; 
  border: none;
`;


// ModalAlert.style.ts
import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const alertMessage = css`
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgray;
  border: 3px solid #000;
  padding: 10px 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  z-index: 1000;
`;

import { css } from "@emotion/react";

export const Container = css`
  width: 100%;
  height: 80px;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
`;

export const BackBtnContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1.45rem 1rem;
  display: flex;
  align-items: center;
`;

export const HamBtnContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HamBtnCss = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const BackBtnCss = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const slidePanelStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #f9f4ff;
  transform: translateX(100%);
  transition: transform 0.3s ease;
`;

export const panelContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 3px solid black;

  button {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;

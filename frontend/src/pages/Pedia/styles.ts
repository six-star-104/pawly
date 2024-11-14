// 스타일 정의 부분 (styles.js)

import { css } from "@emotion/react";

export const BackBtnContainer = css`
  position: absolute;
  top: 1rem;
  left: 1rem;
  margin: 0.25rem;
`;

export const HamBtnContainer = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
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

export const PixelContainerWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const Container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 65vh;
  width: 90%;
  padding: 1rem;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  box-sizing: border-box;
  margin: auto;
`;

export const IconGrid = css`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 1fr));
  grid-template-rows: repeat(3, auto);
  gap: 2rem;
  justify-items: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
  place-items: center;
  min-height: 300px;
`;

export const IconItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  text-align: center;
  padding: 0.5rem;
  img {
    margin-bottom: 0.5rem;
    max-width: 60px;
    height: auto;
  }
`;

export const ArrowContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  width: 100%;
  position: absolute;
  bottom: 0;

  span {
    font-size: 1rem;
  }
`;

export const ArrowButton = css`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.9);
  }
`;

export const headerStyle = css`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: visible;
`;

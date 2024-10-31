import { css } from '@emotion/react';
import background from '../../assets/images/background.png';

export const container = css`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0;
`;

export const BtnContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 0.1rem;
`;

export const HamBtnCss = css`
  display: flex;
  margin: 0.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.95);
  }
`;

export const userBtnCss = css`
  display: flex;
  border: 1px solid black;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.95);
  }
`;

// 슬라이딩 패널 스타일
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

// 패널 내부 콘텐츠 스타일
export const panelContentStyle = css`
  /* padding: 10px; */
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

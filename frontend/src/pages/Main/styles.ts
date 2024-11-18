import { css, keyframes } from "@emotion/react";

export const container = css`
  overflow: auto;
  height: 100vh;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  // 상단바 용
  padding-top: 80px;
`;

export const content = css`
  display: flex;
  // 노트북 & 테블릿 가로 (해상도 1024px ~ )
  @media all and (min-width: 1024px) {
    width: 46.7vh;
  }

  // 테블릿 가로 (해상도 768px ~ 1023px)
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 46.7vh;
  }

  // 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px)
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 46.7vh;
  }

  // 모바일 세로 (해상도 ~ 479px)
  @media all and (max-width: 479px) {
    width: 100%;
  }
  justify-content: center;

  overflow-y: hidden;

  button {
    display: flex;
    padding: 16px 16px;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
`;

export const postboxStyle = css`
  position: absolute;
  bottom: 20px;
  right: 58px;
`;

export const collectionContainer = css`
  position: absolute;
  bottom: 0;
  height: 60vh;
  overflow: hidden;
  padding: 100px;
  width: 100%;
`;

// prettier-ignore
const generateMoveAround = () => keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(${Math.random() * 40 - 20}vw, ${Math.random() * 30 - 10}vh); }
  40% { transform: translate(${Math.random() * 40 - 20}vw, ${Math.random() * 30 - 10}vh); }
  60% { transform: translate(${Math.random() * 40 - 20}vw, ${Math.random() * 30 - 10}vh); }
  80% { transform: translate(${Math.random() * 40 - 20}vw, ${Math.random() * 30 - 10}vh); }
  100% { transform: translate(0, 0); }
`;

export const assetStyle = () => css`
  width: 100px;
  height: 100px;
  animation: ${generateMoveAround()} ${5 + Math.random() * 7}s infinite linear;
  animation-delay: ${Math.random() * 2}s;
`;

export const MyAssetStyle = () => css`
  width: 160px;
  height: 160px;
  animation: ${generateMoveAround()} ${5 + Math.random() * 7}s infinite linear;
  animation-delay: ${Math.random() * 2}s;
`;

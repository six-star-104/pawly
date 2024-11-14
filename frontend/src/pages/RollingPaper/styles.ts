/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const plusButton = css`
  position: fixed;
  bottom: 3%;
  display: flex;
  align-items: center;
  justify-content: end;
  z-index: 3;
  padding-right: 24px;
  img {
    width: 32px;
    height: 32px;
  }

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
`;

export const ListContainer = css`
  min-height: 90vh;
  overflow-y: hidden;
  margin-top: 10vh;

  padding-top: 40px;
  padding-bottom: 40px;
`;

export const container = css`
  overflow: auto;
  height: 100vh;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
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

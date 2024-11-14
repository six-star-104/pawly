import { css } from "@emotion/react";

export const Container = (isRollingpaper: boolean) => css`
  position: fixed;

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

  height: 80px;
  top: 0;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 1000;
  background-color: ${isRollingpaper ? "rgba(255, 255, 255, 0.7)" : ""};
  #title {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.25rem;
  }
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
  top: 4px;
  right: 0;
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    padding: 0px;
    width: 32px;
    height: 32px;
    img {
      position: absolute;
      top: -4px;
      left: -4px;
      margin: 0;
    }
  }
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

export const panelContentStyle = css`
  // display: flex;
  // flex-direction: column;
  // gap: 10px;
  // border: 3px solid black;
  // button {
  //   align-self: flex-end;
  //   background: none;
  //   border: none;
  //   font-size: 20px;
  //   cursor: pointer;
  // }
`;

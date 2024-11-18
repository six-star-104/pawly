import { css } from "@emotion/react";

export const container = css`
  position: fixed;
  bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;

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

export const layout = css`
  background-color: white;
  width: 90%;
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
  }
  button {
    margin-left: 18px;
    min-width: 56px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 5%;
    width: 90%;
    height: 100%;
    box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
      0 -4px 0 0 black;
    pointer-events: none;
  }
`;

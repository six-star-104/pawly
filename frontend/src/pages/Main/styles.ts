import { css } from "@emotion/react";

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

export const assetStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
`;

// 오른쪽 아래에 위치한 postbox 이미지 스타일
export const postboxStyle = css`
  position: absolute;
  bottom: 20px;
  right: 58px;
`;

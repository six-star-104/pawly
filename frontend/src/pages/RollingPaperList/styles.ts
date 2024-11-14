/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const container = css`
  overflow: auto;
  height: 100vh;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;
export const ContentContainer = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 1.2rem;
`;

export const ListContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: space-evenly;
  min-height: 90vh;
  overflow-y: hidden;
  margin-top: 10vh;

  padding-top: 40px;
  padding-bottom: 40px;
  gap: 40px;
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

export const modalStyle = css`
  display: flex;
  // justify-content: center;
  flex-direction: column;
  text-align: center;
  #yesOrNo {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
    button {
      width: 30%;
    }
  }
  textarea {
    width: 90%;
    margin-left: 5%;
    resize: none;
  }
  #reportButton {
    margin: 10px;
    left: 60%;
    width: 30%;
  }
`;
export const tempBtn = css`
  position: fixed;

  bottom: 3%;

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
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 24px;
  z-index: 3;
`;

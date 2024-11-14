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
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: space-evenly;
  // min-height: 90vh;
  overflow-y: hidden;

 
`;

import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5eefc;
`;

export const imgCss = css`
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

export const loginBtn = css`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 14rem;
    height: 3rem; /* 버튼의 높이 조정 */
    padding: 0 1rem;
    border: none;
    font-size: 1rem; /* 글씨 크기 확대 */
    font-family: inherit;
    cursor: pointer;
  }

  button:first-of-type {
    background-color: #fee500;
    color: #000;
  }

  button:last-of-type {
    background-color: #ffffff;
    color: #000;
  }

  img {
    width: 1.5rem; 
    height: 1.5rem;
    margin-right: 1rem; /* 텍스트와의 간격 확대 */
  }
`;

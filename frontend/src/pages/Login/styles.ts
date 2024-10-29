import { css } from '@emotion/react';

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
    width: 12rem;
    height: 3rem; /* 버튼의 높이 조정 */
    border: none;
    font-size: 1reM; /* 글씨 크기 확대 */
    cursor: pointer;
  }

  button:first-of-type {
    background-color: #FEE500;
    color: #000;
  }

  button:last-of-type {
    background-color: #FFFFFF;
    color: #000;
    border: 0.0625rem solid #ddd;
  }

  img {
    width: 1.5rem; /* 이미지 크기 확대 */
    height: 1.5rem;
    margin-right: 0.75rem; /* 텍스트와의 간격 확대 */
  }
`;

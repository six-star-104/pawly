import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5eefc;
`;

export const imgCss = css`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 15rem auto 0;
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
    height: 3rem;
    padding: 0 1rem;
    border: none;
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
  }

  button:first-of-type {
    margin-top: 10rem;
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

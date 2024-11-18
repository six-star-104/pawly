import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  background-image: none;
  button {
    position: fixed;
    right: 10%;
    bottom: 3%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button:hover {
    cursor: pointer;
  }
`;

export const confirmModal = css`
  margin: 0 12px;
`;
export const confirmBtn = css`
  display: flex;
  justify-content: end;
  gap: 2rem;
  margin-top: 16px;
  button {
    min-width: 72px;
  }
`;

export const singleBtn = css`
  margin-left: 80%;
  margin-top: 16px;
`;

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

export const confirmBtn = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 16px;
`;

export const singleBtn = css`
  margin-left: 80%;
  margin-top: 16px;
`;

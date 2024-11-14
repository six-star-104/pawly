import { css } from "@emotion/react";

export const searchWrapper = css`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 1rem;
`;

export const searchContainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 0.5rem;
  border: 3px solid black;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: "Galmuri9";
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    img {
      width: 24px;
      height: 24px;
    }
  }
`;

export const resultsContainer = css`
  padding: 20px;
  margin-top: 20px;
`;

export const searchResultItem = css`
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const messageContainer = css`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export const resultsList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const nickname = css`
  font-weight: bold;
`;

export const name = css`
  color: #666;
`;

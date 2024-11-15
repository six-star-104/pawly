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
  margin-top: 80px;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
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
  padding: 16px;
  margin-top: 16px;
`;

export const searchResultItem = css`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0.7rem;
  border-left: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
  &:first-of-type {
    border-top: 3px solid black;
  }
`;

export const messageContainer = css`
  text-align: center;
  padding: 20px;
  color: black;
`;

export const resultsList = css`
  display: flex;
  flex-direction: column;
`;

export const asset = css`
  width: 50px;
  height: 50px;
`;

export const userInfo = css`
  flex: 1;
  margin-left: 0.5rem;
`;

export const nickname = css`
  font-weight: 500;
`;

export const name = css`
  font-size: 0.8rem;
`;

export const addFriendIcon = css`
  border: none;
  outline: none;
  background: none;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  color: gray;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

export const pendingRequest = css`
  margin-right: 14px;
  font-size: 0.8rem;
  color: gray;
`;

export const buttonContainer = css`
  display: flex;
  justify-content: center;
`;

export const backToFriend = css`
  padding: 0.5rem 1rem;
  background: white;
  border: 3px solid black;
`;

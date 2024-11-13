import { css } from "@emotion/react";

export const Container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
`;

export const friendListContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

export const friendItem = css`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0.7rem;
  border-left: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
`;

export const friendName = css`
  flex: 1;
  text-align: left;

  p {
    font-size: 1rem;
    font-weight: bold;
  }

  span {
    font-size: 0.75rem;
    color: #666;
  }
`;

export const modalContentStyle = css`
  background: #d3e6ff;
  padding: 50px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const alertModalContentStyle = css`
  background: #fff;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const noFriend = css`
  margin: 0 auto;
`;

export const contentContainer = css`
  display: flex;
  width: 100%;
  padding: 0 0.5rem;
  gap: 1rem;
`;

export const asset = css`
  width: 50px;
  height: 50px;
`;

export const nickname = css`
  font-weight: 500;
  font-size: 1.1rem;
`;

export const name = css`
  font-size: 0.8rem;
`;

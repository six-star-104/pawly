import { css } from "@emotion/react";

export const Container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
`;

export const letterListContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  overflow-y: hidden;
`;

export const letterItem = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  padding: 0.7rem;
  border-left: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
`;

export const content = css`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const date = css`
  display: flex;
  font-size: 0.8rem;
  color: #666;
`;

export const nickname = css`
  font-size: 0.8rem;
`;

export const contentContainer = css`
  width: 60%;
  padding: 0 0.5rem;
`;

export const noLetter = css`
  margin: 0 auto;
`;

export const replyIcon = css`
  width: 20px;
  height: 20px;
  margin-right: 1rem;
`;

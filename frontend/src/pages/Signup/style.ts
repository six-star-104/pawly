import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5eefc;
`;

export const logoImg = css`
  margin-bottom: 2rem;
`;

export const title = css`
  font-size: 1.25rem;
`;

export const nicknameInput = css`
  border: none;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  outline: none;
  padding: 0.25rem;
`;
export default {
  container,
  logoImg,
  title,
  nicknameInput,
};

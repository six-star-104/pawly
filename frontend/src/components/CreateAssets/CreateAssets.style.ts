import { css } from "@emotion/react";

// const slideInRight = keyframes`
//   from {
//     transform: translateX(100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// `;
/* animation: ${slideInRight} 0.5s ease-in-out forwards; */

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const title = css`
  font-size: 1.125rem;
`;

export const content = css`
  font-size: 1rem;
  color: gray;
`;

export const assetsInput = css`
  border: none;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  outline: none;
  padding: 0.25rem;
`;

export default {
  container,
  title,
  content,
  assetsInput,
};

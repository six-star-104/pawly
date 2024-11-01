import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
// animation: ${slideInRight} 0.5s ease-in-out forwards;

const container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 320px;
`;

const title = css`
  font-size: 1.25rem;
  text-align: center;
`;

const nicknameInput = css`
  width: 70%;
  margin: 0 auto;

  border: none;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  outline: none;
  padding: 0.5rem;
  transition: border-color 0.3s ease;
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const messageContainer = css`
  width: 70%;
  margin: 0 auto;
  height: 1.25rem;
  margin-top: 0.25rem;
`;

const Message = styled.div<{ isValid: boolean }>`
  font-size: 0.75rem;
  color: ${({ isValid }) => (isValid ? "#4EA965" : "#ff3b30")};
  opacity: ${({ isValid }) => (isValid === null ? 0 : 1)};
  transition: opacity 0.2s ease;
`;

export default {
  container,
  title,
  inputWrapper,
  nicknameInput,
  messageContainer,
  Message,
};

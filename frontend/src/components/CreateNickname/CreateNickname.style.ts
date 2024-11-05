import { css } from "@emotion/react";
import styled from "@emotion/styled";

const container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100vw;
  margin-top: 17rem;
`;

const title = css`
  font-size: 1.25rem;
  text-align: center;
`;

const nicknameInput = css`
  width: 60%;
  padding: 0.5rem;
  margin: 0 auto;

  border: none;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  outline: none;
  transition: border-color 0.3s ease;
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const messageContainer = css`
  width: 60%;
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

import { css } from "@emotion/react";

export const paginationContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

export const paginationButton = css`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #333;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
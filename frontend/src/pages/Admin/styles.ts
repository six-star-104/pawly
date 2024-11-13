import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const adminContainer = css`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #333;
  font-family: Arial, sans-serif;
`;

export const adminHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
  font-size: 1.5rem;
  color: #444;
`;

export const adminContent = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;

  section {
    padding: 1rem;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;

export const reportList = css`
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const loader = css`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const adminBtnContainer = css`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 2rem;

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid #333;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

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

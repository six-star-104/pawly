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
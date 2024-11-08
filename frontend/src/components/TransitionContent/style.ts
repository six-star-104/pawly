// transitionStyles.ts
import { css, keyframes } from "@emotion/react";

// 애니메이션 키프레임 정의
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// 애니메이션 클래스 스타일
export const contentStyle = css`
  opacity: 0;
  &.fadeIn {
    animation: ${fadeInAnimation} 500ms forwards;
  }
  &.fadeOut {
    animation: ${fadeOutAnimation} 500ms forwards;
  }
`;

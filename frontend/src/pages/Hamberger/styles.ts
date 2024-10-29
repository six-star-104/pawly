import { css } from '@emotion/react';

export const containerStyle = css`
  width: 100%;
  height: 100vh;
  background-color: #f2e6ff;
  /* padding: 10px; */
  position: relative;
  background-color: #ffffff;
`;

export const headerStyle = css`
  background-color: #d1b3ff;
  padding: 0.5rem;
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 좌우 끝으로 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  font-weight: bold;
  font-size: 1.125rem;
  border-bottom: 1px solid black;
`;

export const closeButtonStyle = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.95);
  }
`;

export const menuListStyle = css`
  list-style: none;
  padding: 0;
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.25rem;
`;

export const menuItemStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const footerStyle = css`
  text-align: center;
  font-size: 10px;
  color: #333;
  margin-top: 160%;
  border-top: 1px solid black;
  padding-top: 10px;
`;

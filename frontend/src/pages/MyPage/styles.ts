import { css } from '@emotion/react';

export const Container = css`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

export const MyInfo = css`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  /* padding: 0.5rem 0; */
  border-bottom: 3px solid black;
`;

export const InfoSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row; 
  padding: 1rem;
  font-size: 1.2rem;
  border-bottom: 1px solid black;
  width: 90%; 
`;

export const StatsSection = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  /* border-bottom: 1px solid black; */
  width: 90%; 
`;

export const CollectionSection = css`
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  /* border-bottom: 1px solid black; */
  width: 90%; /* 가로로 확장 */

  h3 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

export const FooterButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6666;
  color: white;
  font-weight: bold;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 80%;
  margin: 1rem auto 0;
  text-align: center;
`;

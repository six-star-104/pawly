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

export const contents = css`
  display: flex;
  flex-direction: column;
  align-items: center; /* 전체 내용을 중앙에 배치 */
  width: 100%;
  max-width: 500px; /* 컨테이너 최대 너비 설정 */
  margin-bottom: 30%;
`;

export const MyInfo = css`
  display: inline-block;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid black;
  width: auto;
`;

export const InfoSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0; /* 좌우 패딩 제거 */
  font-size: 1.5rem;
  border-bottom: 2px solid black;
  width: 90%;
  text-align: left; /* 텍스트 왼쪽 정렬 */

  div:first-of-type {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const StatsSection = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  padding: 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
  /* border-bottom: 1px solid black; */
  width: 90%;
  gap: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

export const CollectionSection = css`
  padding: 1rem 0;
  text-align: left; /* 텍스트 왼쪽 정렬 */
  font-size: 1rem;
  line-height: 1.5;
  width: 90%;
  gap: 0.5rem;

  h3 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .items-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    margin-top: 0.5rem;

    .arrow {
      font-size: 1.5rem;
      cursor: pointer;
    }

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }
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
  border-radius: 8px;
  cursor: pointer;
  width: 90%;
  max-width: 250px;
  margin: 1rem auto;
  text-align: center;
  box-sizing: border-box;
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

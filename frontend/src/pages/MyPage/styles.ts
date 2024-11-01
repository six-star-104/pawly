import { css } from '@emotion/react';

export const Container = css`
  width: 100%;
  height: 100vh;
  background-color: #E6E6FA;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const BackBtnContainer = css`
  position: absolute;
  top: 1rem;
  left: 1rem;
  margin: 0.25rem;
`;

export const HamBtnContainer = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const contents = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
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
  padding: 0.5rem 0;
  font-size: 1.5rem;
  border-bottom: 2px solid black;
  width: 90%;
  text-align: left;

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
  align-items: flex-start;
  padding: 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
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
  text-align: left;
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
export const HamBtnCss = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const BackBtnCss = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
// 슬라이딩 패널 스타일
export const slidePanelStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #f9f4ff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
`;

// 패널 내부 콘텐츠 스타일
export const panelContentStyle = css`
  /* padding: 10px; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 3px solid black;
  button {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;
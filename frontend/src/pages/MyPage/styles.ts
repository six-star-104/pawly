import { css } from '@emotion/react';

export const Container = css`
  width: 100%;
  height: 100vh;
  /* background-color: #E6E6FA; */
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
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 0.2rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid black;
  width: auto;
`;

export const InfoSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
  font-size: 1.2rem;
  border-bottom: 2px solid black;
  width: 90%;
  text-align: left;

  div:first-of-type {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* 이미지와 텍스트 사이의 간격 설정 */
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const VerticalTextSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem; /* 닉네임과 유저네임 사이의 간격 설정 */

  h3 {
    font-size: 1.2rem;
    margin: 0;
  }

  h4 {
    font-size: 1rem;
    margin: 0;
    color: #333;
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
  width: 3rem;
  height: 3rem;
  /* margin-right: 1rem; */
  background: none;
  border: none;
  padding: 1;
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

export const inputStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;

  input {
    width: 80%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    outline: none;
    box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
      0 -4px 0 0 black; /* 테두리 효과 추가 */
    transition: box-shadow 0.3s ease;

    &:focus {
      box-shadow: 4px 0 0 0 #007bff, -4px 0 0 0 #007bff, 0 4px 0 0 #007bff,
        0 -4px 0 0 #007bff; /* 포커스 시 파란색 테두리 */
    }

    &:hover {
      box-shadow: 4px 0 0 0 #ff8800, -4px 0 0 0 #ff8800, 0 4px 0 0 #ff8800,
        0 -4px 0 0 #ff8800; /* 호버 시 주황색 테두리 */
    }
  }
`;

export const modalActionsStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem 0;

  button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #45a049;
    }

    &:nth-of-type(2) {
      background-color: #f44336;
    }
  }
`;
export const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 배경색을 반투명하게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContentStyle = css`
  background-color: #fff;
  width: 80%;
  max-width: 400px;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const modalHeaderStyle = css`
  width: auto;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid black;

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
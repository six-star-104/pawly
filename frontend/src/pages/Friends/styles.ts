import { css } from '@emotion/react';

export const Container = css`
  width: 100%;
  height: 214vh;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
`;

export const BackBtnContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1.45rem 1rem;
  display: flex;
  align-items: center;
`;

export const HamBtnContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

export const searchPixelContainerWrapper = css`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 45%;
`;

export const searchContainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid black;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: 'Galmuri9';
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

export const tabContainer = (activeTab: "friends" | "requests") => css`
  display: flex;
  width: 90%;
  max-width: 500px;
  margin-top: 1rem;

  button {
    flex: 1;
    background: #fff;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    font-family: 'Galmuri9';
    border-top: 2px solid black;
    border-bottom: none;
    border-right: 2px solid black;

    &:nth-of-type(1) {
      border-left: 2px solid black;
      border-bottom: ${activeTab === "requests" ? "2px solid black" : "none"};
    }

    &:nth-of-type(2) {
      border-left: none;
      border-bottom: ${activeTab === "friends" ? "2px solid black" : "none"};
    }
  }

  .active {
    background-color: #d3e6ff;
  }
`;

export const friendListContainer = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  gap: 0.5rem;
`;

export const friendItem = css`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  gap: 1rem;
`;

export const friendName = css`
  flex: 1;
  text-align: left;

  p {
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
  }

  span {
    font-size: 0.85rem;
    color: #666;
  }
`;

export const friendActionIcons = css`
  display: flex;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export const slidePanelStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #f9f4ff;
  transform: translateX(100%);
  transition: transform 0.3s ease;
`;

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

export const modalOverlayStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 단순 반투명 배경 */
  z-index: 1000;
`;

export const modalContentStyle = css`
  background: #ecf5ff;
  border-radius: 10px;
  padding: 20px;
  width: 70%;
  max-width: 500px;
  height: 50vh;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const modalHeaderStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-family: 'Galmuri9';
  font-size: 1.2rem;
`;

export const modalInputStyle = css`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid black;
  margin: 8px 0;
  font-family: 'Galmuri9';
  font-size: 1rem;
  background: transparent;
  outline: none;

  &:focus {
    border-color: #333;
  }
`;

export const sendButtonStyle = css`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  font-family: 'Galmuri9';
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
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

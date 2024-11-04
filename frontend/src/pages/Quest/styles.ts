import { css } from '@emotion/react';

export const Container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
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

export const challengeWrapper = css`
  width:90%;
  /* margin: 2rem auto; */
  margin-top: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const challengeListContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* gap: 1rem; */
`;

export const challengeItem = css`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: #fff;
  padding: 1rem;
  border: 2px solid black;
  border-top: none;
  box-sizing: border-box;
  gap: 1rem;
  justify-content: space-between;
`;

export const challengeTitle = css`
  font-weight: bold;
  font-size: 0.9rem;
`;

export const challengeReward = css`
  font-size: 0.8rem;
  color: #666;
`;

export const challengeStatus = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
`;

export const tabContainer = (activeTab: "inProgress" | "completed") => css`
  display: flex;
  width: 100%;
  /* margin: 1rem auto; */
  justify-content: center;

  button {
    flex: 1;
    background: #fff;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    font-family: 'Galmuri9';
    font-size: 0.8rem;
    border-top: 2px solid black;
    border-bottom: none;
    border-right: 2px solid black;

    &:nth-of-type(1) {
      border-left: 2px solid black;
      border-bottom: ${activeTab === "completed" ? "2px solid black" : "none"};
    }

    &:nth-of-type(2) {
      border-left: none;
      border-bottom: ${activeTab === "inProgress" ? "2px solid black" : "none"};
    }
  }

  .active {
    background-color: #d1b3ff;
  }
`;
export const progressContainer = css`
  width: 85%;
  height: 9vh;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const progressBar = (progress: number) => css`
  width: 100%;
  height: 20px;
  background-color: #fff;
  border: 2px outset #000;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${progress}%;
    background-color: #92CC41;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const progressPercentage = css`
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

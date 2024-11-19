import { css } from "@emotion/react";

export const Container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`;

export const challengeWrapper = css`
  width: 90%;
  height: 80%;
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const challengeListContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const challengeItem = css`
  display: flex;
  background-color: #fff;
  padding: 1rem;
  border: 3px solid black;
  border-top: none;
  box-sizing: border-box;
  gap: 1rem;
  justify-content: space-between;
`;

export const chanllengeContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .content {
    font-weight: bold;
    font-size: 0.9rem;
  }
  .reward {
    font-size: 0.8rem;
    color: #666;
  }
`;

export const challengeStatus = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    min-width: 88px;
  }
`;

export const tabContainer = (activeTab: "inProgress" | "completed") => css`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 40px;

  button {
    flex: 1;
    background: #fff;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    font-family: "Galmuri9";
    font-size: 0.8rem;
    border-top: 3px solid black;
    border-bottom: none;
    border-right: 3px solid black;
    min-width: 88px;

    &:nth-of-type(1) {
      border-left: 3px solid black;
      border-bottom: ${activeTab === "completed" ? "3px solid black" : "none"};
    }

    &:nth-of-type(2) {
      border-left: none;
      border-bottom: ${activeTab === "inProgress" ? "3px solid black" : "none"};
    }
  }

  .active {
    background-color: #d3e6ff;
  }
`;

export const deleteModalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const deleteModalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5efff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  gap: 1rem;
  & > .icon-text {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const rewardTitleStyle = css`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  border-bottom: 3px solid black;
`;

export const congratsContainerStyle = css`
  background-color: #fff;
  width: calc(100% + 4rem); /* 양쪽으로 확장 */
  margin: 0 -1rem; /* 좌우 마진을 음수로 설정 */
  padding: 0.5rem 1rem;
  text-align: center;
  font-weight: bold;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const warningIconStyle = css`
  width: 3rem;
  height: 3rem;
`;

export const progressContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 85%;
  height: 9vh;
  margin: 1rem 0 3rem;
`;

export const modalBodyStyle = css`
  padding: 1rem;
  margin: 0 auto;
`;

import { css } from "@emotion/react";

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
`;

export const challengeItem = css`
  display: flex;
  flex-direction: column;
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

// export const progressContainer = css`
//   width: 85%;
//   height: 9vh;
//   margin: 2rem auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

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

export const rewardTextStyle = css`
  font-weight: bold;
  text-align: center;
  justify-content: center;
  color: #000;
  background-color: green;
  width: 124%;
  height: 8vh;
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
  width: 85%;
  height: 9vh;
  margin: 18px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const modalBodyStyle = css`
  padding: 1rem;
  /* max-width: 500px; */
  margin: 0 auto;
`;

export const margin = css`
  display: flex;
  justify-content: space-evenly;
`;
export const iconTextContainer = css`
  display: flex;
  /* align-items: center; */
  gap: 0.5rem; /* 이미지와 텍스트 사이의 간격 설정 */
`;

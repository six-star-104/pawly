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
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid black;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: "Galmuri9";
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
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
`;

export const tabContainer = (activeTab: "received" | "sent") => css`
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
    font-family: "Galmuri9";
    border-top: 3px solid black;
    border-bottom: none;
    border-right: 3px solid black;

    &:nth-of-type(1) {
      border-left: 3px solid black;
      border-bottom: ${activeTab === "sent" ? "3px solid black" : "none"};
    }

    &:nth-of-type(2) {
      border-left: none;
      border-bottom: ${activeTab === "received" ? "3px solid black" : "none"};
    }
  }

  .active {
    background-color: #d1b3ff;
  }
`;

export const letterListContainer = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
`;

export const letterItem = css`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0.7rem;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  gap: 1rem;
`;

export const letterContent = css`
  flex: 1;
  text-align: left;
`;

export const letterDate = css`
  font-size: 0.9rem;
  color: #666;
`;

export const deleteIcon = css`
  background: none;
  border: none;
  cursor: pointer;
`;

export const deleteModalOverlayStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const deleteModalContentStyle = css`
  background: #fff;
  border: 2px solid black;
  padding: 20px;
  width: 85%;
  text-align: center;
  font-family: "Galmuri9";
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const warningIconStyle = css`
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.5rem;
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const modalContentStyle = css`
  background: #fff;
  border: 2px solid black;
  padding: 0px;
  width: 80%;
  height: 60vh;
  /* max-width: 400px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Galmuri9";
  font-size: 1.3rem;
`;

export const modalHeaderStyle = css`
  background-color: #ece7ff;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #333;
`;

export const closeButtonStyle = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 1.5rem;
`;

export const modalBodyStyle = css`
  width: 100%;
  height: 40vh;
  padding: 10px;
  font-family: "Galmuri9";
  text-align: center;
  color: #333;
  border-bottom: 1px solid #333;
  margin-bottom: 1rem;
`;

export const reactionIconsStyle = css`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  margin-right: auto; /* 아이콘을 왼쪽으로 정렬 */
  .nes-icon {
    font-size: 1.5rem; /* 아이콘 크기 조절 */
    cursor: pointer;
  }
`;

export const modalActionsStyle = css`
  display: flex;
  justify-content: space-between; /* 아이콘과 버튼 사이의 간격 조정 */
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  /* margin-top: 1rem; */
`;

export const replyTextareaStyle = css`
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  border: 1px solid #000;
  font-family: "Galmuri9";
  font-size: 1rem;
  resize: none;
  outline: none;
`;

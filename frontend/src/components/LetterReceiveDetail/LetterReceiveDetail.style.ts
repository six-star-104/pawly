import { css } from "@emotion/react";

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

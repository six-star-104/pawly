import { css } from "@emotion/react";
import styled from "@emotion/styled";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-height: 60vh;
  min-height: 40vh;
  padding: 0;
  background: #fff;
  border: 2px solid black;
  font-family: "Galmuri9";
  font-size: 1rem;
  overflow-y: auto;
`;

export const modalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  color: #333;
  background-color: ${(props) => props.theme.colors.lightpurple};
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const iconContainer = css`
  display: flex;
  align-items: center;
`;

export const replyIcon = css`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
`;

export const closeButtonStyle = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const letterContent = css`
  width: 100%;
  padding: 10px;
  color: #333;
  overflow-y: auto;
  flex: 1;
`;

export const pictureStyle = css`
  display: block;
  margin: auto;
  max-width: 100%;
  height: auto;
  padding: 0 1rem 1rem;
`;

export const reactionIconsStyle = css`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  margin-right: auto;
  .nes-icon {
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const modalActionsStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: #ece7ff;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

export const deleteIcon = css`
  margin-right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

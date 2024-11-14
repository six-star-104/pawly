import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
`;

export const friendRequestContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

export const receiveRequestItem = css`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0.7rem;
  border-left: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
`;

export const sentRequestItem = css`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0.7rem;
  border-left: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
`;

export const contentContainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 0.5rem;
`;

export const asset = css`
  width: 50px;
  height: 50px;
`;

export const nicknameWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 1rem;
`;

export const nicknameContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
`;

export const nickname = css`
  font-weight: 500;
  font-size: 0.9rem;
`;

export const waitingContainer = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const waiting = css`
  text-align: center;
  font-size: 0.7rem;
  color: gray;
`;

export const name = css`
  font-size: 0.6rem;
`;

export const responseIconContainer = css`
  display: flex;
  gap: 0.8rem;
`;

export const responseIcon = css`
  width: 36px;
  height: 36px;
  border: none;
  background: none;
`;

export const noRequest = css`
  margin: 0 auto;
`;

export const modalHeader = styled.div`
  display: flex;
  justify-content: end;
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

export const closeButtonStyle = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const modalContentStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${(props) => props.theme.colors.lightpurple};

  box-sizing: border-box;
`;

export const profileContainer = css`
  margin: 0 auto;
`;
export const modalNickname = css`
  text-align: center;
  font-size: 1.65rem;
  margin-bottom: 0.5rem;
`;

export const modalName = css`
  text-align: center;
`;

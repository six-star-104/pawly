import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
  padding-top: 0.5rem;
  margin-right: 0.5rem;
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

export const nickname = css`
  text-align: center;
  font-size: 1.65rem;
  margin-bottom: 0.5rem;
`;

export const name = css`
  text-align: center;
`;

export const assetImage = css`
  margin-bottom: 1.5rem;
`;

export const buttonContainer = css`
  display: flex;
  margin: 0 auto 1.5rem;
  gap: 1rem;
`;

const Button = styled.button`
  display: inline-block;
  padding: 8px 16px;
  font-size: 1rem;
  color: #000;
  border: 3px solid #000;
  position: relative;
  box-shadow: 3px 3px 0 gray;
  cursor: pointer;
  text-align: center;

  &:active {
    box-shadow: 2px 2px 0 #000;
    transform: translate(2px, 2px);
  }
`;

export const deleteButton = styled(Button)`
  background-color: lightgray;
`;

export const writeLetterButton = styled(Button)`
  background-color: #ffffff;
`;

import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
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
    border-top: 2px solid black;
    border-bottom: none;
    border-right: 2px solid black;

    &:nth-of-type(1) {
      border-left: 2px solid black;
      border-bottom: ${activeTab === "sent" ? "2px solid black" : "none"};
    }

    &:nth-of-type(2) {
      border-left: none;
      border-bottom: ${activeTab === "received" ? "2px solid black" : "none"};
    }
  }

  .active {
    background-color: #d1b3ff;
  }
`;

export const letterListContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export const PageButton = styled.div<{ $active?: boolean }>`
  padding: 1rem;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.yellow};
  }
  @media (max-width: 767px) {
    padding: 0.5rem;
    font-weight: normal;
    font-family: "Righteous";
    margin-bottom: 2rem;
  }
`;

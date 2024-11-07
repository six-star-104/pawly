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

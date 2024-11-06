/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const container = css`
  overflow: auto;
  height: 100vh;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  #title {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 412px;
    height: 10vh;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.7);
  }
  scrollbar-width: none;
`;
export const ContentContainer = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 1.2rem;
`;

export const ListContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: space-evenly;
  min-height: 90vh;
  overflow-y: hidden;
  margin-top: 10vh;

  padding-top: 40px;
  padding-bottom: 40px;
  gap: 40px;
`;

export const backButton = css`
  position: fixed;
  left: 3%;
  top: 3%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background-color: transparent;
  border: none;
`;

export const modalStyle = css`
  display: flex;
  // justify-content: center;
  flex-direction: column;
  text-align: center;
  #yesOrNo {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
    button {
      width: 30%;
    }
  }
  textarea {
    width: 90%;
    margin-left: 5%;
    resize: none;
  }
  #reportButton {
    margin: 10px;
    left: 60%;
    width: 30%;
  }
`;

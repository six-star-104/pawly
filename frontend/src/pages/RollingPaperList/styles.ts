/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const container = css`
  overflow: auto;
  height: 100vh;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  h2 {
    text-align: center;
    margin-top: 3vh;
  }
  scrollbar-width: none;
`;
export const ContentContainer = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:white;
  font-size: 1.2rem;
`;

export const ListContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 120vh;
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

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const plusButton = css`
  position: fixed;
  right: 3%;
  bottom: 3%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

  img {
    width: 32px;
    height: 32px;
  }
`;

export const ListContainer = css`
  min-height: 90vh;
  overflow-y: hidden;
  margin-top: 10vh;

  padding-top: 40px;
  padding-bottom: 40px;
`;

export const container = css`
  overflow: auto;
  height: 100vh;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
    
  scrollbar-width: none;
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

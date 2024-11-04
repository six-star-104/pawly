/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const backButton = css`
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
export const optionColor = (colorOption: string) => css`
  display: flex;
  align-items: center;
  background-color: ${colorOption};
  width: 20px;
  height: 20px;
  font-size: 2rem;
`;
export const contentContainer = css`
#textareacontainer{
display:flex;
justify-content:center;
}
  #content {
    height: 152px;
    width: 90%;
    margin-left: 10px;
    margin-rignt: 10px;
    resize: none;
    overflow: hidden;
    line-height: 24px;
  }
  div #alert {
    text-align: center;
    color: red;
  }
  p {
    margin-bottom: 8px;
    text-align: center;
  }
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
export const ArrowContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const ArrowButton = css`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.9);
  }
`;

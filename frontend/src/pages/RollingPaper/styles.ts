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
export const optionColor = (colorOption: string) => css`
  display: flex;
  align-items: center;
  background-color: ${colorOption};
  width: 20px;
  height: 20px;
  font-size: 2rem;
`;
export const contentContainer = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  #textareacontainer {
    display: flex;
    justify-content: center;
    width: 90%;
    flex-direction: column;
  }
  #content {
    height: 152px;
    width: 100%;
    position: relative;
    left: -4px;
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

  h2 {
    text-align: center;
    margin-top: 3vh;
  }
  scrollbar-width: none;
`;
export const ArrowContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
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
export const CreateButton = css`
  display: flex;
  justify-content: end;
  margin-right: 8%;
`;
// export const PreviewContainer = css`
// display:flex;
// justify-content:center;

// `;

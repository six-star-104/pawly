/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const contentContainer = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 400px;
  #textareacontainer {
    display: flex;
    justify-content: center;
    width: 90%;
    flex-direction: column;
  }
  #content {
    height: 122px;
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
    margin-bottom: 0px;
    margin-top: 8px;
    text-align: center;
  }
`;

export const ArrowContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
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
  width: 100%;
  display: flex;
  justify-content: end;
  margin-right: 8%;
  
`;

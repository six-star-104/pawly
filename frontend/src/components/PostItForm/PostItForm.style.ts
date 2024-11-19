/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const shake = keyframes`
  from {
      opacity: 1;
      transform: translateX(
        3px
      ); 
    }
    to {
      opacity: 3;
      transform: translateX(
        -3px
      );
    }
`;

export const contentContainer = (isAlert: boolean) => css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  p {
    margin-bottom: 0;
  }
  #textareacontainer {
    display: flex;
    justify-content: center;
    width: 90%;
    flex-direction: column;
    text-align: center;
    margin-bottom: 20px;
  }
  #content {
    height: 122px;
    width: 100%;
    position: relative;
    left: -4px;
    margin-top: 15px;
    resize: none;
    overflow: hidden;
    line-height: 24px;
    ${isAlert
      ? css`
          animation: ${shake} 0.1s 3;
          -webkit-animation: ${shake} 0.1s 3;
        `
      : ""}
  }
`;

export const CreateButton = css`
  width: 100%;
  display: flex;
  justify-content: end;
  margin: 3% 8% 3% 0;
`;
export const PostitPreview = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
`;

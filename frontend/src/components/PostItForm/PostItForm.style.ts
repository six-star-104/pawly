/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const contentContainer = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80vw;
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

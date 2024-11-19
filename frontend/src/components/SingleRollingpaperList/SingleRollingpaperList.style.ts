/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const ContentContainer = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 1.2rem;
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

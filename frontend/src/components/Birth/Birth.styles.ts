import { css } from "@emotion/react";

export const inputStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;

  input {
    width: 80%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    outline: none;
    box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
      0 -4px 0 0 black; /* 테두리 효과 추가 */
    transition: box-shadow 0.3s ease;

    &:focus {
      box-shadow: 4px 0 0 0 #007bff, -4px 0 0 0 #007bff, 0 4px 0 0 #007bff,
        0 -4px 0 0 #007bff; /* 포커스 시 파란색 테두리 */
    }

    &:hover {
      box-shadow: 4px 0 0 0 #ff8800, -4px 0 0 0 #ff8800, 0 4px 0 0 #ff8800,
        0 -4px 0 0 #ff8800; /* 호버 시 주황색 테두리 */
    }
  }
`;

export const modalActionsStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem 0;

  button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #45a049;
    }

    &:nth-of-type(2) {
      background-color: #f44336;
    }
  }
`;
export const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 배경색을 반투명하게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContentStyle = css`
  background-color: #fff;
  width: 80%;
  max-width: 400px;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const modalHeaderStyle = css`
  width: auto;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid black;

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const birthCss = css`
  font-size: 0.8rem;
`

export const birthBtn = css`
  background: none;
  cursor: pointer;
  margin-top: -3px;
  border: none;
  box-shadow: 2px 0 0 0 black, -2px 0 0 0 black, 0 2px 0 0 black,
  0 -2px 0 0 black;
`
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const modalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  color: #333;
  background-color: ${(props) => props.theme.colors.lightpurple};
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const closeButtonStyle = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const letterContent = css`
  width: 100%;
  padding: 6px 12px;
  overflow-y: auto;
  flex: 1;
`;
export const inputContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 60vh;
  overflow-y: auto;
  width: 100%;
`;

export const contentInput = css`
  width: 100%;
  min-height: 20vh;
  height: auto;
  max-height: 30vh;
  border: none;
  outline: none;
  font-size: 0.9rem;
  background: repeating-linear-gradient(
    to bottom,
    #fff,
    #fff 24px,
    #bababa 25px
  );
  line-height: 25px;
  overflow-y: auto;
`;
export const fileInputContainer = css`
  margin-top: 10px;
  text-align: center;
`;

export const fileInputLabel = css`
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 1rem;
  background-color: #f0f0f0;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  width: 100%;
  max-width: 200px;
`;

export const fileInput = css`
  display: none;
`;

export const imagePreview = css`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 5px;
  margin-top: 10px;
  max-height: 400px;
  object-fit: cover;
`;

// footer 부분
export const footer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #bababa;
`;

export const sendButton = css`
  display: inline-block;
  padding: 8px 16px;
  font-size: 1rem;
  color: #000;
  background-color: #ffffff;
  border: 3px solid #000;
  position: relative;
  box-shadow: 3px 3px 0 gray;
  cursor: pointer;
  text-align: center;

  &:active {
    box-shadow: 2px 2px 0 #000;
    transform: translate(2px, 2px);
  }
`;

// 전송 완료 버튼
export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const sentMessage = css`
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgray;
  border: 3px solid #000;
  padding: 10px 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  z-index: 1000;
`;

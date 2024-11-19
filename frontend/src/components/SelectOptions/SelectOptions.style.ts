/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const optionColor = (colorOption: string, selectOption: string) => css`
  display: flex;
  align-items: center;

  ${selectOption === "image"
    ? `background-image: url(${colorOption});  background-position: right;  background-size: 300%; ` // 배경 이미지 미리보기 셋팅
    : `background-color: ${colorOption};`}
  width: 24px;
  height: 24px;
  font-size: 2rem;
`;

export const container = css`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

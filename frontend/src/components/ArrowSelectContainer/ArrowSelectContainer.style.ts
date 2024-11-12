import { css } from "@emotion/react";
export const ArrowContainer = (forWhat: string) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0px 20px;
  ${forWhat === "themeId" ? "margin-top:20px;" : ""}
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

export const Preview = css`
  display: flex;
  flex-direction: column;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.1s ease;
`;

export const FontSelector = (fontName: string) => css`
  font-family: ${fontName};
  // height: 60px;
`;

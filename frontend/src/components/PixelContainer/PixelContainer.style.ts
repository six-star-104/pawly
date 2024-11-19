/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PixelContainerProps } from "./PixelContainer.type";

export const pixelContainerStyle = ({
  width,
  height,
}: PixelContainerProps) => css`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  transform: translate(0%, 0%);
  width: ${width || "calc(100% - 40px)"};
  height: ${height || "300px"};
  font-size: 2rem;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
      0 -4px 0 0 black;
    pointer-events: none;
  }
`;

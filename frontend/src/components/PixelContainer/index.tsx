// index.ts
/** @jsxImportSource @emotion/react */
import React from "react";
import { PixelContainerProps } from "./PixelContainer.type";
import { pixelContainerStyle } from "./PixelContainer.style";

const PixelContainer: React.FC<PixelContainerProps> = ({
  width,
  height,
  children,
}) => {
  return <div css={pixelContainerStyle({ width, height })}>{children}</div>;
};

export default PixelContainer;

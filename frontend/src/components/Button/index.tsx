/** @jsxImportSource @emotion/react */
import { ButtonProps } from "./Button.types";
import { base, variantCss } from './Button.styles';

export const Button = ({
  children,
  variant = 'contained',
  color = '#000000', // 기본 텍스트 색상
  backgroundColor = '#ffffff', // 기본 배경 색상
  disabled = false,
  fullwidth = false,
  fontSize,
  padding,
  width,
  height,
  handler,
  ...props
}: ButtonProps) => {
  return (
    <button
      css={[
        base(fullwidth, color, backgroundColor, fontSize, padding, width, height),
        variantCss(variant, color, backgroundColor),
      ]}
      disabled={disabled}
      onClick={handler}
      {...props}
    >
      {children}
    </button>
  );
};

import { css } from '@emotion/react';
import { ButtonVariant } from './Button.types';

export const base = (
  fullwidth: boolean,
  color?: string,
  backgroundColor?: string,
  fontSize?: string,
  padding?: string,
  width?: string,
  height?: string
) => css`
  box-sizing: border-box;
  transition: all 100ms ease;
  user-select: none;
  padding: ${padding || '0.5rem 1rem'}; // 기본 패딩 또는 직접 입력된 패딩
  font-family: 'Galmuri9';
  font-size: ${fontSize || '1rem'}; // 기본 폰트 크기 또는 직접 입력된 크기
  position: relative;
  display: inline-block;
  text-align: center;
  color: ${color || '#000'} !important;
  background-color: ${backgroundColor || '#fff'} !important;

  /* 크기를 직접 지정할 경우 사용 */
  width: ${width || 'auto'};
  height: ${height || 'auto'};

  /* 픽셀 스타일의 직각 테두리 */
  border: 2px solid #000;
  border-radius: 0; /* 픽셀 느낌을 위해 둥근 테두리 제거 */
  box-shadow:
    4px 4px 0px #666,   /* 회색 그림자 */
    -1px -1px 0px #000, /* 상단과 좌측 테두리 */
    1px 1px 0px #000;   /* 하단과 우측 테두리 */

  :enabled {
    cursor: pointer;
    :active {
      top: 1px;
      left: 1px;
      box-shadow:
        1px 1px 0px #000 inset,  /* 내부 눌림 효과 */
        3px 3px 0px #666 inset;  /* 내부 회색 그림자 */
    }
  }

  :disabled {
    cursor: default;
    color: #888;
    background-color: #f0f0f0;
    box-shadow: none;
  }

  ${fullwidth &&
  css`
    width: 100%;
  `}
`;

export const variantCss = (
  variant: ButtonVariant,
  color?: string,
  backgroundColor?: string
) => {
  switch (variant) {
    case 'contained':
      return css`
        background-color: ${backgroundColor || '#fff'} !important;
        color: ${color || '#000'};
      `;

    case 'outlined':
      return css`
        background-color: transparent !important;
        color: ${color || '#000'} !important;
        border: 2px solid ${color || '#000'} !important;
      `;
  }
};

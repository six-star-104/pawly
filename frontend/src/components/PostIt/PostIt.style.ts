/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import smallghost from '@/assets/images/bubbleTheme/minighost.jpg'

const px = 4;
const shadow = `rgba(0, 0, 0, 0.2)`;

// bubble 테두리 스타일 정의
// const bubbleBorder = `
//   0 -${px}px ${bgColor},
//   0 -${2 * px}px ${borderColor},
//   ${px}px 0 ${bgColor},
//   ${px}px -${px}px ${borderColor},
//   ${2 * px}px 0 ${borderColor},
//   0 ${px}px ${bgColor},
//   0 ${2 * px}px ${borderColor},
//   -${px}px 0 ${bgColor},
//   -${px}px ${px}px ${borderColor},
//   -${2 * px}px 0 ${borderColor},
//   -${px}px -${px}px ${borderColor},
//   ${px}px ${px}px ${borderColor}
// `;

const fonts = ["Galmuri9", "PFStardust", "DGM"];
// 최종 말풍선 스타일
export const bubbleStyle = (
  textColor: string,
  borderColor: string,
  bgColor: string | null,
  bgImg: string | null,
  isPreview: boolean | undefined,
  font: number
) => css`
  position: relative;
  display: inline-block;
  margin: ${5 * px}px;
  text-align: start;
  font-size: 16px;
  line-height: 1.3em;
  white-space: pre-wrap;
 word-wrap: break-word;


  font-family: ${fonts[font - 1]};
  // 이미지 있으면 배경이 이미지 되도록
  ${bgImg
    ? ` background-image: url(${bgImg}); background-position: center; background-repeat: repeat; background-size: contatin;`
    : `  background-color: ${bgColor}; `}

  color: ${textColor};
  padding: ${4 * px}px;

  box-sizing: border-box;
  width: 200px;

  // 미리보기면 텍스트 중앙 정렬
  ${isPreview ? "text-align:center" : ""};

  box-shadow: 0 -${px}px ${bgColor}, 0 -${2 * px}px ${borderColor},
    ${px}px 0 ${bgColor}, ${px}px -${px}px ${borderColor},
    ${2 * px}px 0 ${borderColor}, 0 ${px}px ${bgColor},
    0 ${2 * px}px ${borderColor}, -${px}px 0 ${bgColor},
    -${px}px ${px}px ${borderColor}, -${2 * px}px 0 ${borderColor},
    -${px}px -${px}px ${borderColor}, ${px}px ${px}px ${borderColor},
    ${px}px ${3 * px}px ${shadow}, ${3 * px}px ${px}px ${shadow},
    ${2 * px}px ${2 * px}px ${shadow};

  &.mini {
    width: 120px;
    // font-size: 16px;
    padding: 4px;
  }

  &.medium {
    width: 350px;
  }

  &.large {
    width: 560px;
    font-size: 24px;
    text-align: left;
    text-transform: uppercase;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    box-sizing: border-box;
  }

  &.top::after {
    height: ${px}px;
    width: ${px}px;
    top: -${2 * px}px;
    left: ${8 * px}px;
    box-shadow: 0 -${px}px ${borderColor}, 0 -${2 * px}px ${borderColor},
      0 -${3 * px}px ${borderColor}, 0 -${4 * px}px ${borderColor},
      -${px}px -${3 * px}px ${borderColor},
      -${2 * px}px -${2 * px}px ${borderColor},
      -${3 * px}px -${px}px ${borderColor}, -${px}px -${px}px ${bgColor},
      -${2 * px}px -${px}px ${bgColor}, -${px}px -${2 * px}px ${bgColor},
      -${px}px 0 ${bgColor}, -${2 * px}px 0 ${bgColor},
      -${3 * px}px 0 ${bgColor};
  }

  &.right::after {
    height: ${px}px;
    width: ${px}px;
    top: ${5 * px}px;
    right: -${2 * px}px;
    background: ${bgColor};
    box-shadow: ${px}px -${px}px ${bgColor}, ${px}px 0 ${bgColor},
      ${2 * px}px 0 ${bgColor}, 0 -${2 * px}px ${bgColor},
      ${px}px ${px}px ${borderColor}, ${2 * px}px ${px}px ${borderColor},
      ${3 * px}px ${px}px ${borderColor}, ${4 * px}px ${px}px ${borderColor},
      ${3 * px}px 0 ${borderColor}, ${2 * px}px -${px}px ${borderColor},
      ${px}px -${2 * px}px ${borderColor}, 0 -${px}px ${bgColor};
  }

  &.bottom::after {
    height: ${px}px;
    width: ${px}px;
    bottom: -${2 * px}px;
    left: ${8 * px}px;
    box-shadow: 0 ${px}px ${borderColor}, 0 ${2 * px}px ${borderColor},
      0 ${3 * px}px ${borderColor}, 0 ${4 * px}px ${borderColor},
      -${px}px ${3 * px}px ${borderColor},
      -${2 * px}px ${2 * px}px ${borderColor},
      -${3 * px}px ${px}px ${borderColor}, -${px}px ${px}px ${bgColor},
      -${2 * px}px ${px}px ${bgColor}, -${px}px ${2 * px}px ${bgColor},
      -${px}px 0 ${bgColor}, -${2 * px}px 0 ${bgColor},
      -${3 * px}px 0 ${bgColor};
  }

  &.left::after {
    height: ${px}px;
    width: ${px}px;
    top: ${5 * px}px;
    left: -${2 * px}px;
    background: ${bgColor};
    box-shadow: -${px}px -${px}px ${bgColor}, -${px}px 0 ${bgColor},
      -${2 * px}px 0 ${bgColor}, 0 -${2 * px}px ${bgColor},
      -${px}px ${px}px ${borderColor}, -${2 * px}px ${px}px ${borderColor},
      -${3 * px}px ${px}px ${borderColor}, -${4 * px}px ${px}px ${borderColor},
      -${3 * px}px 0 ${borderColor}, -${2 * px}px -${px}px ${borderColor},
      -${px}px -${2 * px}px ${borderColor}, 0 -${px}px ${bgColor};
  }
`;

export const fromWho = css`
  width: 100%;
  display: flex;
  justify-content: end;
  padding-right: 8%;
  margin-top:12px;
`;

export const menuStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
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

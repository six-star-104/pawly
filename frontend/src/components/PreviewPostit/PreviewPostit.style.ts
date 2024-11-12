/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
// import smallghost from '@/assets/images/bubbleTheme/minighost.jpg'

const shake = keyframes`
  from {
      opacity: 1;
      transform: translateX(
        3px
      ); 
    }
    to {
      opacity: 3;
      transform: translateX(
        -3px
      );
    }
`;

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

// 최종 말풍선 스타일
export const bubbleStyle = (
  textColor: string,
  borderColor: string,
  bgColor: string | null,
  bgImg: string | null
  //   사용 가능 or 불가능
) => css`
  position: relative;
  display: inline-block;
  margin: ${5 * px}px;
  text-align: start;
  font-size: 16px;
  line-height: 1.3em;
  white-space: pre-wrap;

  ${bgImg
    ? ` background-image: url(${bgImg}); background-position: center; background-repeat: repeat; background-size: contatin;`
    : `  background-color: ${bgColor}; `}

  color: ${textColor};
  padding: ${4 * px}px;

  box-sizing: border-box;
  width: 150px;

  text-align: center;
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
`;

export const pixelLock = (flag: boolean, isAlert: boolean) => css`
  display: flex;
  position:relative
  justify-content: center;
  align-items: center;
  
  #lockimg {
    display: ${flag ? "none" : ""};
      width: 40px;
      height: 40px;
      position: absolute;

      left: 78px;
    }

  filter: ${flag ? "" : "grayscale(80%)"};

  ${
    isAlert
      ? css`
          animation: ${shake} 0.1s 3;
          -webkit-animation: ${shake} 0.1s 3;
        `
      : ""
  }
  
`;

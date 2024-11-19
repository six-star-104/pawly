import { Global, css } from "@emotion/react";
import Stardust from "@/assets/fonts/PFStardust.ttf";
import DGM from "@/assets/fonts/DungGeunMo.ttf";

function GlobalStyles() {
  return (
    <Global
      styles={css`
        body {
          font-family: "Galmuri9", sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          max-height: 100%;
          overflow-y: scroll;
    
          @font-face {
          font-family: "PFStardust";
          src: url(${Stardust}) format("truetype"),
          font-weight: 400;
          font-style: bold;
          }

          @font-face {
          font-family: "DGM";
          src: url(${DGM}) format("truetype"),
          font-weight: 400;
          font-style: normal;
          }

          // 드래그 방지 기능
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-use-select: none;
          user-select: none;
        }
        .no-scroll {
          overflow: hidden;
        }
      `}
    />
  );
}

export default GlobalStyles;

import { Global, css } from "@emotion/react";
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

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
          min-height: 100vh;
        }
      `}
    />
  );
}

export default GlobalStyles;

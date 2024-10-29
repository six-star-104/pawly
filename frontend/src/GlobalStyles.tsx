/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import background from "@/assets/background.png";

function GlobalStyles() {
  return (
    <Global
      styles={css`
        body {
          background-image: url(${background});
          background-size: cover;
          background-repeat: no-repeat;
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

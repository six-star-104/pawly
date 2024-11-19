export const theme = {
  colors: {
    primary: "#F7D51D",
    primaryHover: "#F2C409",
    // primary: "#BE96D7",
    disabled: "#cccccc",
    disabledHover: "#e0e0e0",
    error: "#ff3b30",
    yellow: "#F7D51D",
    yellowHover: "#F2C409",
    gray: "#D6D6D6",
    grayHover: "#C1C1C1",
    orange: "#FFB145",
    lightpurple: "#ece7ff",
    purpleHover: "#BE96D7",
    darkpurple: "#561A7C",
    text: "#333",
    paginationDisabled: "#909090",
  },
};

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      primaryHover: string;
      disabled: string;
      disabledHover: string;
      error: string;
      yellow: string;
      yellowHover: string;
      gray: string;
      grayHover: string;
      orange: string;
      lightpurple: string;
      purpleHover: string;
      darkpurple: string;
      text: string;
      paginationDisabled: string;
    };
  }
}

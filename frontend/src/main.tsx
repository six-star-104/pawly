import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import GlobalStyles from "@/styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

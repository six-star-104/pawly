import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import GlobalStyles from "@/styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
// Firebase Service Worker 등록
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.log("Service Worker 등록 실패:", error);
    });
}

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

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

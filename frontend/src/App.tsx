import Router from "@/Router";
import MobileLayout from "@/styles/MobileLayout";
import "./firebase-messaging-sw.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.js";

function App() {
  const location = useLocation();
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {location.pathname !== "/admin" ? (
          <MobileLayout>
            <GlobalStyles />

            <Router />
          </MobileLayout>
        ) : (
          <Router />
        )}
      </QueryClientProvider>
    </>
  );
}

export default App;

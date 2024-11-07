import Router from "@/Router";
import MobileLayout from "@/styles/MobileLayout";
// import TransitionContent from "@/components/TransitionContent";
import "./firebase-messaging-sw.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MobileLayout>
          {/* <TransitionContent> */}
          <Router />
          {/* </TransitionContent> */}
        </MobileLayout>
      </QueryClientProvider>
    </>
  );
}

export default App;

import Router from "@/Router";
import MobileLayout from "@/styles/MobileLayout";
// import TransitionContent from "@/components/TransitionContent";
import "./firebase-messaging-sw.js";

function App() {
  return (
    <>
      <MobileLayout>
        {/* <TransitionContent> */}
        <Router />
        {/* </TransitionContent> */}
      </MobileLayout>
    </>
  );
}

export default App;

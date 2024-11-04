import Router from "@/Router";
import MobileLayout from "@/styles/MobileLayout";
// import TransitionContent from "@/components/TransitionContent";

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

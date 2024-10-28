import PixelContainer from "./components/PixelContainer";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <PixelContainer />
      <Modal title="모달" isOpen={true} onClose={() => {}}>
        모달
      </Modal>
    </>
  );
}

export default App;

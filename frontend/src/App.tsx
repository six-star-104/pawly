import PixelContainer from "./components/PixelContainer";
import Modal from "./components/Modal";
import background from "./assets/images/background.png";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { MailBoxFind } from "./pages/MailBoxFind";
function App() {
  return (
    <>
      <PixelContainer />
      <Modal title="모달" isOpen={true} onClose={() => {}}>
        모달
      </Modal>
      {/* <img src={background} alt="" /> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mailboxfind" element={<MailBoxFind />} />
      </Routes>
    </>
  );
}

export default App;

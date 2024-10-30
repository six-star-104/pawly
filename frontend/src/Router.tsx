import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";
import { MyPage } from "@/pages/MyPage";
import { Friends } from "./pages/Friends";


function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/friends" element={<Friends />} />
    </Routes>
  );
}

export default Router;

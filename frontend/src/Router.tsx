import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";
import { MyPage } from "@/pages/MyPage";


function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default Router;

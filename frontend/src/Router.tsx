import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";
import { MailBoxFind } from "./pages/MailBoxFind";
import { MyPage } from "@/pages/MyPage";
import { Friends } from "./pages/Friends";
import { Pedia } from "@/pages/Pedia";
import { RollingPaper } from "@/pages/RollingPaper";
import { RollingPaperList } from "./pages/RollingPaperList";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/ar" element={<MailBoxFind />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/pedia" element={<Pedia />} />
      <Route path="/rollingpaper/:rollingpaperid" element={<RollingPaper />} />
      <Route path="/rollingpaper" element={<RollingPaperList />} />
    </Routes>
  );
}

export default Router;

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";
import { MailBoxFind } from "./pages/MailBoxFind";
import { SignUp } from "@/pages/Signup";
import { MyPage } from "@/pages/MyPage";
import { Friends } from "@/pages/Friends";
import { Pedia } from "@/pages/Pedia";
import { RollingPaper } from "@/pages/RollingPaper";
import { RollingPaperList } from "./pages/RollingPaperList";
import { Letter } from "@/pages/Letter";
import { EasterEgg } from "@/pages/EasterEgg";
import { Admin } from "@/pages/Admin";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tmpsignup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/pedia" element={<Pedia />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/easteregg" element={<EasterEgg />} />
        <Route path="/ar" element={<MailBoxFind />} />
        <Route
          path="/rollingpaper/:rollingpaperid"
          element={<RollingPaper />}
        />
        <Route path="/rollingpaper" element={<RollingPaperList />} />
      </Route>
    </Routes>
  );
}

export default Router;

import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";
import { MailBoxFind } from "./pages/MailBoxFind";
import { Signup } from "@/pages/Signup";
function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/ar" element={<MailBoxFind />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Router;

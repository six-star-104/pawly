import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";
import { MailBoxFind } from "./pages/MailBoxFind";
function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/ar" element={<MailBoxFind />} />
    </Routes>
  );
}

export default Router;

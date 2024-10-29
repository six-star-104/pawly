import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default Router;

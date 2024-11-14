/** @jsxImportSource @emotion/react */
// import { useState } from "react";
import { container, content } from "./styles";

import { logout } from "@/apis/userService";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    navigateTo("/login");
  };

  const adminMove = () => {
    navigateTo("/admin");
  };

  const arMove = () => {
    navigateTo("/ar");
  };
  return (
    <div css={container}>
      <div css={content}>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={adminMove}>Admin</button>
        <button onClick={arMove}>AR 페이지로 이동</button>
      </div>
    </div>
  );
};

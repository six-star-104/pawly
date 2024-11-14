/** @jsxImportSource @emotion/react */
// import { useState } from "react";
import { container, content } from "./styles";

import CameraIcon from "@/assets/icons/camera.png";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigateTo = useNavigate();

  const arMove = () => {
    navigateTo("/ar");
  };

  return (
    <div css={container}>
      <div css={content}>
        <button onClick={arMove} className="nes-btn">
          <img src={CameraIcon} />
          AR 페이지로 이동
        </button>
      </div>
    </div>
  );
};

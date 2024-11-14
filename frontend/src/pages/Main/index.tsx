import * as style from "./styles";
import CameraIcon from "@/assets/icons/camera.png";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useNavigate } from "react-router-dom";
import postbox from "@/assets/icons/postbox.svg";

export const Main = () => {
  const navigateTo = useNavigate();
  const { assets } = useUserInfoStore();

  const arMove = () => {
    navigateTo("/ar");
  };

  return (
    <div css={style.container}>
      <div css={style.content}>
        <button onClick={arMove} className="nes-btn">
          <img src={CameraIcon} />
          AR 우체통 찾기
        </button>
      </div>

      <img src={assets} alt="" css={style.assetStyle} />

      <img src={postbox} alt="" css={style.postboxStyle} />
    </div>
  );
};

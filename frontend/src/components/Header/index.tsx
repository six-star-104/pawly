import * as style from "./Header.style";
import NavButton from "@/assets/icons/NavButton.png";
import BackButton from "@/assets/icons/BackButton.png";
import { useNavigate } from "react-router-dom";
import { Hamberger } from "@/pages/Hamberger";
import { useState } from "react";
export const Header = () => {
  const navigate = useNavigate();
  const [mypageVisible, setMyPageVisible] = useState(false);

  const backBtn = () => {
    navigate("/");
  };

  const Hambtn = () => {
    setMyPageVisible(true);
  };

  const closeMyPage = () => {
    setMyPageVisible(false);
  };

  return (
    <div css={style.Container}>
      {/* 뒤로가기 버튼 */}
      <div css={style.BackBtnContainer}>
        <button css={style.BackBtnCss} onClick={backBtn}>
          <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
        </button>
      </div>
      {/* 햄버거 메뉴 버튼 */}
      <div css={style.HamBtnContainer}>
        <button css={style.HamBtnCss} onClick={Hambtn}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>

      <div
        css={[
          style.slidePanelStyle,
          mypageVisible && { transform: "translateX(0)" },
        ]}
      >
        <div css={style.panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>
    </div>
  );
};

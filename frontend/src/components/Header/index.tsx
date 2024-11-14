import * as style from "./Header.style";
import HamburgerBtn from "@/assets/icons/hamburgerBtn.svg";
// import BackButton from "@/assets/icons/BackButton.png";
import BackButton from "@/assets/icons/back_button.png";
import { useNavigate, useLocation } from "react-router-dom";
import { SideMenu } from "../SideMenu";
import { useState } from "react";
import { useHeaderStore } from "@/stores/headerStore";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { titleContent } = useHeaderStore();
  const backBtn = () => {
    navigate(-1);
  };

  const Hambtn = () => {
    setIsSideMenuOpen(true);
  };

  const closeMyPage = () => {
    setIsSideMenuOpen(false);
  };

  const isRollingpaper = location.pathname.includes("rollingpaper");

  if (
    location.pathname.startsWith("/ar") ||
    location.pathname.startsWith("/login")
  )
    return;

  return (
    <div css={style.Container(isRollingpaper)}>
      {/* 롤링페이퍼 페이지만 있는 뒤로가기 버튼 */}
      {location.pathname !== "/" && (
        <div css={style.BackBtnContainer}>
          <button css={style.BackBtnCss} onClick={backBtn}>
            <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
          </button>
        </div>
      )}
      {isRollingpaper && <div id="title">{titleContent}</div>}

      {/* 햄버거 메뉴 버튼 */}
      <div css={style.HamBtnContainer}>
        <button className="nes-btn" onClick={Hambtn}>
          <img src={HamburgerBtn} alt="햄버거 버튼" width={32} />
        </button>
      </div>

      {/* 사이드 메뉴바 */}

      {/* <div css={style.panelContentStyle}> */}
      <SideMenu isOpen={isSideMenuOpen} onClose={closeMyPage} />
      {/* </div> */}
    </div>
  );
};

/** @jsxImportSource @emotion/react */
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import {
  containerStyle,
  headerStyle,
  sideBarOverlay,
  menuListStyle,
  menuItemStyle,
  footerStyle,
} from "./SideMenu.style";
import {
  FaStickyNote,
  FaEnvelope,
  FaTasks,
  FaGraduationCap,
  FaPaw,
  FaUser,
  FaHome,
} from "react-icons/fa";
import { ISideMenu } from "../../types/sideMenuTypes";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useState, useEffect } from "react";
export const SideMenu: React.FC<ISideMenu> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { nickname } = useUserInfoStore();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  // 슬라이드 애니메이션 동작시간용
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 메뉴 밖 부분 클릭시 닫기
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const homeMove = () => {
    // 햄버거 메뉴에서 들어가는 페이지는 내가 받은거만 다뜨는거니까
    onClose();
    navigate("/");
  };
  const rollingPaperMove = () => {
    onClose();
    navigate("/rollingpaper");
  };
  const mypageMove = () => {
    onClose();
    navigate("/mypage");
  };
  const friendsMove = () => {
    onClose();
    navigate("/friends");
  };
  const pediaMove = () => {
    onClose();
    navigate("/pedia");
  };
  const letterMove = () => {
    onClose();
    navigate("/letter");
  };
  const eastereggMove = () => {
    onClose();
    navigate("/easteregg");
  };

  if (!isOpen && !isAnimating) return null;

  return ReactDOM.createPortal(
    <div
      css={sideBarOverlay(isOpen)}
      ref={overlayRef}
      onTouchStart={handleMouseDown}
      // pc 테스트용
      onMouseDown={handleMouseDown}
    >
      <div css={containerStyle}>
        <div css={headerStyle}>
          {nickname}님 환영합니다!
        </div>
        <ul css={menuListStyle}>
          <li onClick={homeMove} css={menuItemStyle}>
            <FaHome /> 홈
          </li>
          <li onClick={rollingPaperMove} css={menuItemStyle}>
            <FaStickyNote /> 롤링페이퍼
          </li>
          <li onClick={letterMove} css={menuItemStyle}>
            <FaEnvelope /> 편지함
          </li>
          <li onClick={eastereggMove} css={menuItemStyle}>
            <FaTasks /> 도전과제
          </li>
          <li onClick={pediaMove} css={menuItemStyle}>
            <FaGraduationCap /> 도감
          </li>
          <li onClick={friendsMove} css={menuItemStyle}>
            <FaPaw /> 친구
          </li>
          <li onClick={mypageMove} css={menuItemStyle}>
            <FaUser /> 마이페이지
          </li>
        </ul>
        <div css={footerStyle}><p>ⓒCOPYRIGHT. SSAFY D104</p></div>
      </div>
    </div>,
    document.body
  );
};

import React from "react";
import styled from "@emotion/styled";
import backgroundImage from "@/assets/images/background.png";
import { useLocation } from "react-router-dom";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileContainer = styled.div<{ hasBackground: boolean }>`
  height: 100vh;

  // 모바일 말고 모든 사이즈단에서 배경 비율을 위해 높이 너비 비율 고정

  // 노트북 & 테블릿 가로 (해상도 1024px ~ )
  @media all and (min-width: 1024px)  {
    width: 46.7vh;
  }

  // 테블릿 가로 (해상도 768px ~ 1023px)
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 46.7vh;
  }

  // 모바일 가로 & 테블릿 세로 (해상도 480px ~ 767px)
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 46.7vh;
  }

  // 모바일 세로 (해상도 ~ 479px)
  @media all and (max-width: 479px) {
    width: 100%;
  }

  margin: 0 auto;
  position: relative;
  // overflow-x: hidden;

  /* 배경 이미지 설정 */
  ${({ hasBackground }) =>
    hasBackground &&
    `
    background-image: url(${backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    /* 배경 이미지 위에 컨텐츠가 잘 보이도록 필요한 경우 오버레이 추가 */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.25);
      z-index: 1;
      pointer-events: none;
    }
  `}
`;

const SafeArea = styled.div`
  height: 100%;
  position: relative;
  z-index: 2;
`;

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const location = useLocation();
  const noBackgroundRoutes = ["/ar"];
  const hasBackground = !noBackgroundRoutes.includes(location.pathname);

  return (
    <MobileContainer hasBackground={hasBackground}>
      <SafeArea>{children}</SafeArea>
    </MobileContainer>
  );
};

export default MobileLayout;

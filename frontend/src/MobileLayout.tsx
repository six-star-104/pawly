import React from "react";
import styled from "@emotion/styled";
import backgroundImage from "@/assets/images/background.png";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileContainer = styled.div`
  max-width: 412px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  overflow-x: hidden;

  /* 배경 이미지 설정 */
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

  @media (max-width: 375px) {
    width: 100%;
  }
`;

const SafeArea = styled.div`
  height: 100%;
  position: relative;
  z-index: 2;
`;

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <MobileContainer>
      <SafeArea>{children}</SafeArea>
    </MobileContainer>
  );
};

export default MobileLayout;
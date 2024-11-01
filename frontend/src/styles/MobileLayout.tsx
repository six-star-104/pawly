import React from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { BackGround } from "@/styles/BackGround";
interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileContainer = styled.div<{ hasBackground: boolean }>`
  max-width: 412px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: transparent;
  position: relative;
  overflow-x: hidden;
  z-index: 10;

  @media (max-width: 375px) {
    width: 100%;
  }
`;

const SafeArea = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const location = useLocation();
  const noBackgroundRoutes = ["/ar"];
  const hasBackground = !noBackgroundRoutes.includes(location.pathname);

  return (
    <MobileContainer hasBackground={hasBackground}>
      {hasBackground && <BackGround />}
      <SafeArea>{children}</SafeArea>
    </MobileContainer>
  );
};

export default MobileLayout;

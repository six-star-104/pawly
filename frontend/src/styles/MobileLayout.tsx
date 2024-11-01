import React from "react";
import styled from "@emotion/styled";
import backgroundImage from "@/assets/images/background.png";
import { useLocation } from "react-router-dom";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileContainer = styled.div<{ hasBackground: boolean }>`
  max-width: 412px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  overflow-x: hidden;

  ${({ hasBackground }) =>
    hasBackground &&
    `
    background-image: url(${backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

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

  @media (max-width: 375px) {
    width: 100%;
  }
`;

const SafeArea = styled.div`
  height: 100%;
  position: relative;
  z-index: 2;
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
      <SafeArea>{children}</SafeArea>
    </MobileContainer>
  );
};

export default MobileLayout;

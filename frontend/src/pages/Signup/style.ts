import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 10;
  align-items: center;
`;

export const logoContainer = css`
  width: 70%;
  margin: 12rem auto 0;
`;

export const PageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  flex: 1;
  overflow: hidden;
`;

export const Page = styled.div<{ $pageNum: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease;

  .content {
    flex: 1;
    width: 100vw;
    overflow-y: auto;
    padding: 0 auto;
  }

  &:nth-of-type(1) {
    transform: translateX(${(props) => (props.$pageNum - 1) * -100}%);
  }

  &:nth-of-type(2) {
    transform: translateX(${(props) => (props.$pageNum - 1) * -100 + 100}%);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
  width: 100%;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 5rem;
  gap: 3rem;
`;

export const Button = styled.button<{
  disabled?: boolean;
}>`
  padding: 0.5rem 1.75rem;
  font-size: 1.125rem;
  border: none;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
`;

export const NextButton = styled(Button)`
  color: black;

  background-color: ${(props) =>
    props.disabled ? props.theme.colors.disabled : props.theme.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

export const PrevButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.gray};

  &:hover {
    background-color: ${(props) => props.theme.colors.grayHover};
  }
`;

export const SubmitButton = styled(Button)`
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.disabled : props.theme.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;
export const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 2rem;
`;

import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 10;
`;

export const logoContainer = css`
  width: 70%;
  margin: 12rem auto 0;
`;

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  transition: transform 0.5s ease;
`;

export const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-top: 5rem;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  outline: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#F7D51D")};
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#cccccc" : "#F2C409")};
  }
`;

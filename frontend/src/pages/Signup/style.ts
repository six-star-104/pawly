/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div<{ pageNum: number }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  overflow: hidden;
  border-radius: 8px;
`;

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Page = styled.div<{ pageNum: number }>`
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform: translateX(${(props) => -100 * (props.pageNum - 1)}%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#007aff")};
  color: white;
  transition: background-color 0.3s ease;
`;

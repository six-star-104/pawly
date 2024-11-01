import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 10;
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

  &:hover {
    background-color: ${(props) => (props.disabled ? "#cccccc" : "#0056b3")};
  }
`;

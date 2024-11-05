import styled from "@emotion/styled";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
`;

export const title = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  color: #333;
`;

export const content = styled.div`
  text-align: center;
  margin-top: 0.65rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: #666;
`;

export const inputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const assetsInput = styled.input`
  width: 80%;
  margin: 0 auto;
  padding: 0.5rem;
  border: none;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  outline: none;
  transition: border-color 0.3s ease;
`;

export const errorContainer = styled.div`
  margin: 1rem 0;
`;
export const error = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
`;

export const resultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const imageContainer = styled.div`
  width: 270px;
  height: 270px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const characterImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
`;

export const nameInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.375rem;
  border: none;
  box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
    0 -4px 0 0 black;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const generateButton = styled(Button)`
  width: 30%;
  margin: 0 auto;
  color: black;

  background-color: ${(props) =>
    props.disabled ? props.theme.colors.disabled : props.theme.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

export const regenerateButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
`;

export const buttonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

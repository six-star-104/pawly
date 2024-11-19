import { css } from "@emotion/react";

export const containerStyle = css`
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 2rem;
`;

export const headerStyle = css`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const inputGroupStyle = css`
  display: flex;
  flex-direction: column;
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const checkboxGroupStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const buttonStyle = css`
  padding: 0.75rem;
  background-color: #fff;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const messageStyle = css`
  margin-top: 1rem;
  color: #28a745;
  font-weight: bold;
  text-align: center;
`;

export const previewContainerStyle = css`
  margin-top: 1.5rem;
  text-align: center;
`;

export const themeListContainerStyle = css`
  margin-top: 2rem;
`;


export const themeListStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 1rem;
  list-style: none;
  padding: 0;
`;

export const themeItemStyle = css`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center; 
  align-items: center;
  justify-content: center;

  p {
    margin: 0.5rem 0;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #fff;
    color: #000;
    font-weight: bold;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
      color: #fff;
    }
  }
`;

export const paginationContainerStyle = css`
  display: flex;
  justify-content: space-between;  
  align-items: center;
  width: 100%; 
  margin-top: 1rem;
`;

export const paginationButtonStyle = css`
  background-color: #fff;
  color: #000;
  font-size: 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
  &:disabled {
    background-color: #fff;
    cursor: not-allowed;
  }
`;

import { css } from "@emotion/react";

export const containerStyle = css`
  /* max-width: 600px; */
  /* margin: 0 auto; */
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
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
  background-color: #007bff;
  color: white;
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
`;
export const themeListStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개씩 배치 */
  grid-template-rows: repeat(2, auto); /* 두 줄로 배치 */
  gap: 1rem;
  list-style: none;
  padding: 0;
`;

export const paginationStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
    &:disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
    }
  }
`;
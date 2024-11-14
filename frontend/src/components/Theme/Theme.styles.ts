// Theme.styles.ts
import { css } from '@emotion/react';

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  gap: 1rem;
`;

export const inputGroupStyle = css`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }
`;

export const checkboxGroupStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const buttonStyle = css`
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
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

export const prevpaleteContainer = css`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-right: 5%;

`
export const previewContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 10vh;
  margin-bottom: 0px;
`;

export const paletteContainerStyle = css`
  margin-top: 10%;
  width: 100%;
  /* height: 60vh; */
  margin-right: 1rem;
  display: flex;
  /* flex-direction: column;
  align-items: center;
  justify-content: center; */
`;

export const mainContainerStyle = css`
  display: flex;
  /* justify-content: space-between; */
  gap: 1rem; 
`;

export const leftContainerStyle = css`
  flex: 1;
`;

export const rightContainerStyle = css`
  flex: 2;
  display: flex;
  flex-direction: row;
`;

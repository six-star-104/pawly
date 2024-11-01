import { css } from "@emotion/react";

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
  `,

  title: css`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: #333;
  `,

  content: css`
    font-size: 1rem;
    color: #666;
    text-align: center;
  `,

  inputContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  assetsInput: css`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007aff;
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  `,

  generateButton: css`
    padding: 0.75rem;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `,

  error: css`
    color: #ff3b30;
    font-size: 0.875rem;
    text-align: center;
  `,

  resultContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  `,

  characterImage: css`
    width: 200px;
    height: 200px;
    object-fit: contain;
    border-radius: 8px;
  `,

  nameInputContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  nameInput: css`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007aff;
    }
  `,

  regenerateButton: css`
    padding: 0.75rem;
    background-color: #ff9500;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff8000;
    }
  `,
};

export default styles;

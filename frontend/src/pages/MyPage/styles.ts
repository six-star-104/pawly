import { css } from "@emotion/react";

export const Container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
`;

export const myPageContent = css`
  width: 100%;
  max-width: 500px;
  margin-top: 80px;
  border: 3px solid black;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const InfoSection = css`
  margin: 1rem;
  gap: 0.5rem;
`;

export const infoContainer = css`
  display: flex;
  gap: 0.5rem;
`;

export const nicknameContainer = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .nickname {
    font-weight: 800;
    font-size: 1.2rem;
  }

  button {
    background: none;
    border: none;
    padding: 1;
    cursor: pointer;
    transition: transform 0.1s ease;

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const nameContainer = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 1rem;

  .name {
    font-size: 0.9rem;
  }
`;

// 활동 내역 부분
export const StatsSection = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  gap: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

// 도감 부분
export const CollectionSection = css`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  text-align: center;

  .items-container-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    max-width: 300px;
    margin: 0 auto;
  }

  .items-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .arrow-left,
  .arrow-right {
    font-size: 1.25rem;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  .arrow-left:active,
  .arrow-right:active {
    transform: scale(0.9);
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    width: 80px;
    height: 100px;
    overflow: hidden;

    img {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }

    p {
      font-size: 0.9rem;
      text-align: center;
      height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const inputStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;

  input {
    width: 80%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    outline: none;
    box-shadow: 4px 0 0 0 black, -4px 0 0 0 black, 0 4px 0 0 black,
      0 -4px 0 0 black;
    transition: box-shadow 0.3s ease;
  }
`;

export const modalActionsStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem 0;

  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #45a049;
    }

    &:nth-of-type(2) {
      background-color: #f44336;
    }
  }
`;
export const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 배경색을 반투명하게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContentStyle = css`
  background-color: #fff;
  width: 80%;
  max-width: 400px;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const modalHeaderStyle = css`
  width: auto;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid black;

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const ArrowButton = css`
  background: none;
  border: none;
  font-size: 1.5rem;
  margin: 0 2rem;
  cursor: pointer;
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.9);
  }
`;

export const iconSize = css`
  width: 20px;
  height: 20px;
`;

import { css } from "@emotion/react";

export const PixelContainerWrapper = css`
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

export const Container = css`
  width: 100%;
  max-width: 500px;
  margin-top: 130px;
  border: 3px solid black;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const IconGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  place-items: center;
`;

export const IconItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  padding: 1rem 0;

  img {
    margin-bottom: 0.5rem;
    height: 70px;
    width: 70px;
  }
`;

export const ArrowContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  width: 100%;

  span {
    font-size: 1rem;
  }
`;

export const ArrowButton = css`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.9);
  }
`;

export const headerStyle = css`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: visible;
`;

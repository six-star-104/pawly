import { css } from '@emotion/react';

export const Container = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
`;

export const BtnContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HamBtnCss = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const searchPixelContainerWrapper = css`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 45%;
`;

export const searchContainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid black;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: none;
    font-family: 'Galmuri9';
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

export const tabContainer = css`
  display: flex;
  width: 90%;
  max-width: 500px;
  margin-top: 1rem;

  button {
    flex: 1;
    background: #fff;
    border: 2px solid black;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
  }

  .active {
    background-color: #d3e6ff;
  }
`;

export const friendListContainer = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const friendItem = css`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  border: 2px solid black;
  border-radius: 8px;
  gap: 1rem;
`;

export const friendName = css`
  flex: 1;
  text-align: left;

  p {
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
  }

  span {
    font-size: 0.85rem;
    color: #666;
  }
`;

export const friendActionIcons = css`
  display: flex;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export const slidePanelStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #f9f4ff;
  transform: translateX(100%);
  transition: transform 0.3s ease;
`;

export const panelContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 3px solid black;

  button {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;

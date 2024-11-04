import { css } from '@emotion/react';
import background from '../../assets/images/background.png';

export const container = css`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  /* background-position: center; */
  background-repeat: no-repeat;
  margin: 0;
`;

export const xBtnCss = css`
  display: flex;
  background-color: white;
  
  /* margin: 0 !important; */
`
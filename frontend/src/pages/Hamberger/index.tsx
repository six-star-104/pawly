/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerStyle, headerStyle, closeButtonStyle, menuListStyle, menuItemStyle, footerStyle } from './styles';
import { FaStickyNote, FaEnvelope, FaTasks, FaGraduationCap, FaPaw, FaUser } from 'react-icons/fa';
import CancelButton from '../../assets/icons/CancelButton.png';
import { IHamberger } from '../../types/hambergerTypes'

export const Hamberger: React.FC<IHamberger> = ({ closeMyPage }) => { 
  return (
    <>
    <div css={containerStyle}>
      <div css={headerStyle}>
        남은식다 님 환영합니다!
        <button css={closeButtonStyle} onClick={closeMyPage}>
          <img src={CancelButton} alt="Cancel Button" width={25} />
        </button>
      </div>
      <ul css={menuListStyle}>
        <li css={menuItemStyle}><FaStickyNote /> 롤링페이퍼</li>
        <li css={menuItemStyle}><FaEnvelope /> 편지함</li>
        <li css={menuItemStyle}><FaTasks /> 도전과제</li>
        <li css={menuItemStyle}><FaGraduationCap /> 도감</li>
        <li css={menuItemStyle}><FaPaw /> 친구</li>
        <li css={menuItemStyle}><FaUser /> 마이페이지</li>
      </ul>
      <div css={footerStyle}>ⓒCOPYRIGHT. SSAFY D104</div>
    </div>
    </>
  );
};

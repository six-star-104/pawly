/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { containerStyle, headerStyle, closeButtonStyle, menuListStyle, menuItemStyle, footerStyle } from './styles';
import { FaStickyNote, FaEnvelope, FaTasks, FaGraduationCap, FaPaw, FaUser } from 'react-icons/fa';
import CancelButton from '../../assets/icons/CancelButton.png';
import { IHamberger } from '../../types/hambergerTypes'
import { useUserInfoStore } from '@/stores/mypageStore';

export const Hamberger: React.FC<IHamberger> = ({ closeMyPage }) => { 
  
  const navigate = useNavigate();
  const { nickname } = useUserInfoStore();
  
  const rollingPaperMove = () => {
    // 햄버거 메뉴에서 들어가는 페이지는 내가 받은거만 다뜨는거니까
    navigate('/rollingpaper')
  }
  const mypageMove = () => {
    navigate('/mypage')
  }
  const friendsMove = () => {
    navigate('/friends')
  }
  const pediaMove = () => {
    navigate('/pedia')
  }
  const letterMove =() => {
    navigate('/letter')
  }
  const questMove =() => {
    navigate('/quest')
  }

  return (
    <>
    <div css={containerStyle}>
      <div css={headerStyle}>
        {nickname}님 환영합니다!
        <button css={closeButtonStyle} onClick={closeMyPage}>
          <img src={CancelButton} alt="Cancel Button" width={25} />
        </button>
      </div>
      <ul css={menuListStyle}>
        <li onClick={rollingPaperMove}  css={menuItemStyle}><FaStickyNote /> 롤링페이퍼</li>
        <li onClick={letterMove} css={menuItemStyle}><FaEnvelope /> 편지함</li>
        <li onClick={questMove} css={menuItemStyle}><FaTasks /> 도전과제</li>
        <li onClick={pediaMove} css={menuItemStyle}><FaGraduationCap /> 도감</li>
        <li onClick={friendsMove} css={menuItemStyle}><FaPaw /> 친구</li>
        <li onClick={mypageMove} css={menuItemStyle}><FaUser /> 마이페이지</li>
      </ul>
      <div css={footerStyle}>ⓒCOPYRIGHT. SSAFY D104</div>
    </div>
    </>
  );
};

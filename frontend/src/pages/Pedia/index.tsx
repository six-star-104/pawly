/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavButton from '../../assets/icons/NavButton.png';
import BackButton from '../../assets/icons/BackButton.png';
import PixelPuppy from '@/assets/icons/PixelPuppy.png';
import Puppy2 from '@/assets/icons/Puppy2.png';
import Cat from '@/assets/icons/Cat.png';
import Wolf from '@/assets/icons/Wolf.png';
import PixelContainer from '@/components/PixelContainer';

import { 
  BackBtnContainer,
  HamBtnContainer,
  HamBtnCss,
  BackBtnCss,
  slidePanelStyle,
  panelContentStyle,
  PixelContainerWrapper,
  IconGrid,
  IconItem,
  ArrowContainer,
  ArrowButton
} from './styles';

export const Pedia = () => {
  const [mypageVisible, setMyPageVisible] = useState(false); 
  const navigate = useNavigate();

  const close = () => {
    navigate(-1);
  };

  const openMenu = () => {
    setMyPageVisible(true);
  };

  const closeMyPage = () => {
    setMyPageVisible(false);
  };

  return (
    <div>
      <div css={BackBtnContainer}>
        <button css={BackBtnCss} onClick={close}>
          <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
        </button>
      </div>

      <div css={HamBtnContainer}>
        <button css={HamBtnCss} onClick={openMenu}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>

      <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
        <div css={panelContentStyle}>
          {/* 슬라이딩 메뉴 내용 */}
        </div>
      </div>

      <div css={PixelContainerWrapper}>
        <PixelContainer
          width="90%"
          height="80vh"
          children={
            <div>
              <div css={IconGrid}>
                <div css={IconItem}>
                  <img src={PixelPuppy} alt="누구개" width={60} />
                  <p>누구개</p>
                </div>
                <div css={IconItem}>
                  <img src={Cat} alt="누구세요" width={60} />
                  <p>누구세요</p>
                </div>
                <div css={IconItem}>
                  <img src={Puppy2} alt="친구의친구" width={60} />
                  <p>친구의친</p>
                </div>
                <div css={IconItem}>
                  <img src={Wolf} alt="누구개개" width={60} />
                  <p>누구개개</p>
                </div>
                <div css={IconItem}>
                  <img src={Cat} alt="고양친구" width={60} />
                  <p>고양친구</p>
                </div>
                <div css={IconItem}>
                  <img src={PixelPuppy} alt="강한친구" width={60} />
                  <p>강한친구</p>
                </div>
              </div>
              <div css={ArrowContainer}>
                <button css={ArrowButton}>◀️</button>
                <button css={ArrowButton}>▶️</button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

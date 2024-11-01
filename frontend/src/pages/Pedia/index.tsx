/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavButton from '../../assets/icons/NavButton.png';
import BackButton from '../../assets/icons/BackButton.png';
import PixelPuppy from '@/assets/icons/PixelPuppy.png';
import Puppy2 from '@/assets/icons/Puppy2.png';
import Cat from '@/assets/icons/Cat.png';
import Wolf from '@/assets/icons/Wolf.png';
import PixelContainer from '@/components/PixelContainer';
import { pediaIcon } from '@/types/pediaTypes';

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
  ArrowButton,
  headerStyle
} from './styles';
import { Hamberger } from '../Hamberger';

export const Pedia = () => {
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [icons, setIcons] = useState<pediaIcon[]>([]);
  const [username, setUsername] = useState("사용자"); // 로그인한 사용자 이름 설정

  const navigate = useNavigate();

  // 임시 사용자 이름 설정 및 아이콘 데이터 설정
  useEffect(() => {
    // 사용자 이름 설정
    setUsername("홍길동"); // 임시 사용자 이름 설정, 실제로는 API 호출로 대체 예정

    // 임시 아이콘 데이터
    const mockIcons: pediaIcon[] = [
      { imageUrl: PixelPuppy, label: '누구개' },
      { imageUrl: Cat, label: '누구세요' },
      { imageUrl: Puppy2, label: '친구의친' },
      { imageUrl: Wolf, label: '누구개개' },
      { imageUrl: Cat, label: '고양친구' },
      { imageUrl: PixelPuppy, label: '강한친구' },
    ];
    setIcons(mockIcons);
  }, []);

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
        <h2 css={headerStyle}>{username}님의 도감</h2> {/* 사용자 이름을 포함한 제목 */}
        <PixelContainer
          width="90%"
          height="70vh"
          children={
            <div>
              <div css={IconGrid}>
                {icons.map((icon, index) => (
                  <div css={IconItem} key={index}>
                    <img src={icon.imageUrl} alt={icon.label} width={60} />
                    <p>{icon.label}</p>
                  </div>
                ))}
              </div>
              <div css={ArrowContainer}>
                <button css={ArrowButton}>◀️</button>
                <button css={ArrowButton}>▶️</button>
              </div>
            </div>
          }
        />
        <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
          <div css={panelContentStyle}>
            <Hamberger closeMyPage={closeMyPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

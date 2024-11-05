/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  BackBtnContainer, 
  HamBtnContainer, 
  MyInfo, 
  InfoSection, 
  StatsSection, 
  CollectionSection, 
  closeButtonStyle, 
  contents,
  HamBtnCss,
  BackBtnCss,
  slidePanelStyle, 
  panelContentStyle,
  VerticalTextSection
} from './styles';
import PixelContainer from '../../components/PixelContainer';
import CancelButton from '../../assets/icons/CancelButton.png';
import PixelPuppy from '../../assets/icons/PixelPuppy.png';
import NavButton from '../../assets/icons/NavButton.png';
import BackButton from '../../assets/icons/BackButton.png';
import { Hamberger } from '../Hamberger';

export const MyPage = () => {
  const [mypageVisible, setMyPageVisible] = useState(false); 
  const navigate = useNavigate();

  const close = () => {
    console.log('닫기');
    navigate(-1);
  };

  const openMenu = () => {
    console.log('메뉴 열기');
    setMyPageVisible(true);
  };

  const closeMyPage = () => {
    setMyPageVisible(false); // 슬라이딩 패널 숨기기
  };

  return (
    <div>
      <div css={Container}>
        {/* 뒤로 가기 버튼 */}
        <div css={BackBtnContainer}>
          <button css={BackBtnCss} onClick={close}>
            <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
          </button>
        </div>

        {/* 햄버거 메뉴 버튼 */}
        <div css={HamBtnContainer}>
          <button css={HamBtnCss} onClick={openMenu}>
            <img src={NavButton} alt="햄버거 버튼" width={40} />
          </button>
        </div>

        <PixelContainer
          width="90%"
          height="70vh"
          children={
            <div css={contents}>
              <div css={MyInfo}>나의 정보</div>

              <div css={InfoSection}>
                <div css={VerticalTextSection}>
                  <h3>누구개 </h3> 
                  <h4>남은식</h4> 
                </div>
                <div>
                  <button css={closeButtonStyle}><img src="https://unpkg.com/pixelarticons@1.8.1/svg/edit.svg" alt="편집 버튼" width="30" height="30" /></button> 
                  <button onClick={close} css={closeButtonStyle}><img src={CancelButton} alt="닫기 버튼" width={25} /></button>
                </div> 
              </div>
              
              
              <div css={StatsSection}>
                <div><img src="https://unpkg.com/pixelarticons@1.8.1/svg/reciept.svg" alt="롤링페이퍼 아이콘" width="20" height="20" /> 작성한 롤링페이퍼: n개</div>
                <div><img src="https://unpkg.com/pixelarticons@1.8.1/svg/trophy.svg" alt="도전과제 아이콘" width="20" height="20" /> 달성한 도전과제: n개</div>
                <div><img src={PixelPuppy} alt="동물 도감 아이콘" width={20} height={20}/> 저장된 동물 도감: n개</div>
              </div>

              <div css={CollectionSection}>
                <h3>남은식님의 도감</h3>
                <div>◀️ 하나 둘 셋 ▶️</div>
              </div>

              <div css={CollectionSection}>
                <h3>남은식님의 보상목록</h3>
                <div>◀️ 넷 다섯 여섯  ▶️</div>
              </div>
            </div>
          }
        />
      </div>
        <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
          <div css={panelContentStyle}>
            <Hamberger closeMyPage={closeMyPage}/>
          </div>
        </div>
    </div>
  );
};

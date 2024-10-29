/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container, MyInfo, InfoSection, StatsSection, CollectionSection, FooterButton, closeButtonStyle } from './styles';
import PixelContainer from '../../components/PixelContainer';
import CancelButton from '../../assets/icons/CancelButton.png'
import PixelPuppy from '../../assets/icons/pixelPuppy.png'

export const MyPage = () => {
  return (
    <div>
      <div css={Container}>
        <PixelContainer
          width="90%"
          height="70vh"
          children={
            <div>
              <div css={MyInfo}>나의 정보</div>

              <div css={InfoSection}>
                <div>
                  <span>누구개 </span> 
                  <span>남은식</span> 
                </div>
                <div>
                  <button css={closeButtonStyle}><img src="https://unpkg.com/pixelarticons@1.8.1/svg/edit.svg" alt="~~~" width="30" height="30" /></button> 
                  <button css={closeButtonStyle}><img src={CancelButton} alt="Cancel Button" width={25} /></button>
                </div> 
              </div>

              
              <div css={StatsSection}>
                <div><img src="https://unpkg.com/pixelarticons@1.8.1/svg/reciept.svg" alt="~~~" width="20" height="20" /> 작성한 롤링페이퍼: n개</div>
                <div><img src="https://unpkg.com/pixelarticons@1.8.1/svg/trophy.svg" alt="~~~" width="20" height="20" /> 달성한 도전과제: n개</div>
                <div><img src={PixelPuppy} alt="Cancel Button" width={20} height={20}/> 저장된 동물 도감: n개</div>
              </div>

              
              <div css={CollectionSection}>
                <h3>남은식님의 도감</h3>
                <div>◀️ 하나 둘 셋 ▶️</div>
              </div>

              
              <div css={CollectionSection}>
                <h3>남은식님의 보상목록</h3>
                <div>◀️ 넷 다섯 여섯  ▶️</div>
              </div>

            
              {/* <div css={FooterButton}>회원탈퇴</div> */}
            </div>
          }
        />
      </div>
    </div>
  );
};

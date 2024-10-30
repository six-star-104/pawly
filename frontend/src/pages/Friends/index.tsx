/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Hamberger } from '../Hamberger';
import NavButton from '../../assets/icons/NavButton.png';
import PixelPuppy from '../../assets/icons/PixelPuppy.png';
import PixelContainer from '@/components/PixelContainer';

import {
  Container,
  BtnContainer,
  HamBtnCss,
  
  slidePanelStyle,
  panelContentStyle,
  searchContainer,
  tabContainer,
  friendListContainer,
  friendItem,
  friendName,
  friendActionIcons,
  searchPixelContainerWrapper
} from './styles';

export const Friends = () => {
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("friends");

  const Hambtn = () => {
    setMyPageVisible(true);
  };

  const closeMyPage = () => {
    setMyPageVisible(false);
  };

  return (
    <div css={Container}>
      {/* 상단 버튼들 */}
      <div css={BtnContainer}>
        <button css={HamBtnCss} onClick={Hambtn}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>

      {/* 검색창 */}
      <div css={searchPixelContainerWrapper}>
        <PixelContainer
          width='90%'
          height='5%'
          children={
            <div css={searchContainer}>
              <input type="text" placeholder="친구 검색" />
              <button>
                <img src="https://unpkg.com/pixelarticons@1.8.1/svg/search.svg" alt="검색 아이콘" width={20} height={20} />
              </button>
            </div>
          }
        />
      </div>

      {/* 탭 메뉴 */}
      <div css={tabContainer}>
        <button onClick={() => setActiveTab("friends")} className={activeTab === "friends" ? "active" : ""}>친구 목록</button>
        <button onClick={() => setActiveTab("requests")} className={activeTab === "requests" ? "active" : ""}>친구 요청</button>
      </div>

      {/* 친구 목록 */}
      <div css={friendListContainer}>
        {activeTab === "friends" && (
          <>
            <div css={friendItem}>
              <img src={PixelPuppy} alt="친구 아바타" width={40} height={40} />
              <div css={friendName}>
                <p>남은식다</p>
                <span>남은식</span>
              </div>
              <div css={friendActionIcons}>
                <button>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/mail.svg" alt="메일 아이콘" width={20} height={20} />
                </button>
                <button>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="삭제 아이콘" width={20} height={20} />
                </button>
              </div>
            </div>
            {/* 추가 친구 항목 */}
          </>
        )}
        {activeTab === "requests" && (
          <>
            <div css={friendItem}>
              <img src={PixelPuppy} alt="친구 아바타" width={40} height={40} />
              <div css={friendName}>
                <p>민준이다</p>
                <span>박민준</span>
              </div>
              <div css={friendActionIcons}>
                <button>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/check.svg" alt="수락 아이콘" width={20} height={20} />
                </button>
                <button>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="거절 아이콘" width={20} height={20} />
                </button>
              </div>
            </div>
            {/* 추가 친구 요청 항목 */}
          </>
        )}
      </div>

      {/* 슬라이딩 패널 */}
      <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>
    </div>
  );
};

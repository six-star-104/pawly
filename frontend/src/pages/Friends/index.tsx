/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hamberger } from '../Hamberger';
import NavButton from '../../assets/icons/NavButton.png';
import PixelPuppy from '../../assets/icons/PixelPuppy.png';
import CancelButton from '../../assets/icons/CancelButton.png';
import BackButton from '../../assets/icons/BackButton.png';
import Modal from '@/components/Modal';
import {
  Container,
  BackBtnContainer,
  HamBtnContainer,
  HamBtnCss,
  BackBtnCss,
  slidePanelStyle,
  panelContentStyle,
  searchContainer,
  tabContainer,
  friendListContainer,
  friendItem,
  friendName,
  friendActionIcons,
  searchPixelContainerWrapper,
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  modalInputStyle,
  sendButtonStyle,
  closeButtonStyle
} from './styles';

export const Friends = () => {
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"friends" | "requests">("friends");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(""); // 메시지 상태 추가
  const navigate = useNavigate();

  const backBtn = () => {
    navigate(-1)
  }
  const Hambtn = () => {
    setMyPageVisible(true);
  };

  const closeMyPage = () => {
    setMyPageVisible(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage(""); // 모달 닫힐 때 메시지 초기화
  };

  const handleSend = () => {
    console.log("전송된 메시지:", message);
    setMessage(""); // 메시지 초기화
    closeModal(); // 모달 닫기
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div css={Container}>
      {/* 뒤로가기 버튼 */}
      <div css={BackBtnContainer}>
        <button css={BackBtnCss} onClick={backBtn}>
          <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
        </button>
      </div>

      {/* 햄버거 메뉴 버튼 */}
      <div css={HamBtnContainer}>
        <button css={HamBtnCss} onClick={Hambtn}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>

      {/* 검색창 */}
      <div css={searchPixelContainerWrapper}>
        <div css={searchContainer}>
          <input type="text" placeholder="친구 검색" />
          <button>
            <img src="https://unpkg.com/pixelarticons@1.8.1/svg/search.svg" alt="검색 아이콘" width={20} height={20} />
          </button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div css={tabContainer(activeTab)}>
        <button onClick={() => setActiveTab("friends")} className={activeTab === "friends" ? "active" : ""}>친구 목록</button>
        <button onClick={() => setActiveTab("requests")} className={activeTab === "requests" ? "active" : ""}>친구 요청</button>
      </div>

      {/* 친구 목록 / 친구 요청 */}
      <div css={friendListContainer}>
        {activeTab === "friends" && (
          <>
            {/* 친구 목록 */}
            <div css={friendItem}>
              <img src={PixelPuppy} alt="친구 아바타" width={40} height={40} />
              <div css={friendName}>
                <p>남은식다</p>
                <span>남은식</span>
              </div>
              <div css={friendActionIcons}>
                <button onClick={openModal}>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/mail.svg" alt="메일 아이콘" width={20} height={20} />
                </button>
                <button>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="삭제 아이콘" width={20} height={20} />
                </button>
              </div>
            </div>
          </>
        )}
        {activeTab === "requests" && (
          <>
            {/* 친구 요청 */}
            <div css={friendItem}>
              <img src={PixelPuppy} alt="친구 요청 아바타" width={40} height={40} />
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
          </>
        )}
      </div>

      {/* 슬라이딩 패널 */}
      <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            <div css={modalHeaderStyle}>
              <span>To. 친구</span>
              <button css={closeButtonStyle} onClick={closeModal}><img src={CancelButton} alt="Cancel Button" width={25} /></button>
            </div>
            <textarea
              css={modalInputStyle}
              placeholder="메시지를 입력하세요..."
              rows={15} // 기본 textarea 크기 설정
              value={message}
              onChange={handleChange}
            />
            <button css={sendButtonStyle} onClick={handleSend}>
              전송하기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

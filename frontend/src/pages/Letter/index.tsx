/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  BackBtnContainer,
  BackBtnCss,
  HamBtnContainer,
  HamBtnCss,
  searchPixelContainerWrapper,
  searchContainer,
  slidePanelStyle,
  panelContentStyle,
  tabContainer,
  letterListContainer,
  letterItem,
  letterContent,
  letterDate,
  deleteIcon,
  deleteModalOverlayStyle,
  deleteModalContentStyle,
  warningIconStyle,
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  closeButtonStyle,
  modalBodyStyle,
  reactionIconsStyle,
  modalActionsStyle
} from './styles';
import { Hamberger } from '../Hamberger';
import NavButton from '../../assets/icons/NavButton.png';
import BackButton from '../../assets/icons/BackButton.png';
import Warning from '../../assets/icons/Warning.png';
import Modal from '@/components/Modal';
import { Button } from '@/components/Button';
import { ILetter } from '@/types/letterTypes';

export const Letter = () => {
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<ILetter | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const mockReceivedLetters: ILetter[] = [
      { id: 1, sender: "남은식다", content: "배고프지 않냐", date: "10.25" },
      { id: 2, sender: "민준이다", content: "좋은 아침", date: "10.26" }
    ];

    const mockSentLetters: ILetter[] = [
      { id: 3, sender: "파피몬", content: "오늘 점심 뭐지 아니", date: "10.25" },
      { id: 4, sender: "가루몬", content: "배고프지 않냐", date: "10.27" }
    ];

    setLetters(activeTab === "received" ? mockReceivedLetters : mockSentLetters);
  }, [activeTab]);

  const backBtn = () => navigate(-1);

  const Hambtn = () => setMyPageVisible(true);

  const closeMyPage = () => setMyPageVisible(false);

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    setIsDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openReplyModal = (letter: ILetter) => {
    setSelectedLetter(letter);
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => setIsReplyModalOpen(false);

  return (
    <div css={Container}>
      <div css={BackBtnContainer}>
        <button css={BackBtnCss} onClick={backBtn}>
          <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
        </button>
      </div>

      <div css={HamBtnContainer}>
        <button css={HamBtnCss} onClick={Hambtn}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>

      <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>

      <div css={searchPixelContainerWrapper}>
        <div css={searchContainer}>
          <input type="text" placeholder="편지 검색" />
          <button>
            <img src="https://unpkg.com/pixelarticons@1.8.1/svg/search.svg" alt="검색 아이콘" width={20} height={20} />
          </button>
        </div>
      </div>

      <div css={tabContainer(activeTab)}>
        <button onClick={() => setActiveTab("received")} className={activeTab === "received" ? "active" : ""}>받은 편지함</button>
        <button onClick={() => setActiveTab("sent")} className={activeTab === "sent" ? "active" : ""}>보낸 편지함</button>
      </div>

      <div css={letterListContainer}>
        {letters.map((letter) => (
          <div css={letterItem} key={letter.id} onClick={() => openReplyModal(letter)}>
            <div css={letterContent}>
              <p>{letter.sender}</p>
              <span>{letter.content}</span>
            </div>
            <div css={letterDate}>{letter.date}</div>
            <button onClick={openDeleteModal} css={deleteIcon}>
              <img src="https://unpkg.com/pixelarticons@1.8.1/svg/trash.svg" alt="쓰레기 아이콘" width={20} height={20} />
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="">
        <div css={deleteModalOverlayStyle}>
          <div css={deleteModalContentStyle}>
            <img src={Warning} alt="경고 아이콘" css={warningIconStyle} />
            <span>정말 삭제하시겠습니까?</span>
            <span>편지를 삭제해도 상대방 편지함에서 삭제되지 않습니다.</span>
            <Button
              backgroundColor='#ffffff'
              color='#000'
              variant="contained"
              fullwidth={false}
              rounded={0}
              handler={closeDeleteModal}
              fontSize='1rem'
              width='40%'
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>

      {selectedLetter && (
        <Modal isOpen={isReplyModalOpen} onClose={closeReplyModal} title="">
          <div css={modalOverlayStyle}>
            <div css={modalContentStyle}>
              <div css={modalHeaderStyle}>
                <span>From. {selectedLetter.sender}</span>
                <button css={closeButtonStyle} onClick={closeReplyModal}>✖️</button>
              </div>
              <div css={modalBodyStyle}>{selectedLetter.content}</div>
              <div css={reactionIconsStyle}>
                <i className="nes-icon is-small heart"></i>
                <i className="nes-icon is-small star"></i>
                <i className="nes-icon is-small like"></i>
              </div>
              <div css={modalActionsStyle}>
                <Button backgroundColor='#fff' color='#000' variant="outlined" handler={() => console.log("답장하기")}>답장하기</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

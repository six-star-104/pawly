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
import { ILetter, IReadLetter } from '@/types/letterTypes';

export const Letter = () => {
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<IReadLetter | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reactionIcon, setReactionIcon] = useState<JSX.Element | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const mockReceivedLetters: ILetter[] = [
      {
        letterId: 1,
        senderId: "123",
        senderNickname: "민준",
        createdAt: "2024-10-24 12:50:00",
        updatedAt: "2024-10-24 12:55:00",
      },
      {
        letterId: 2,
        senderId: "124",
        senderNickname: "혜민",
        createdAt: "2024-10-24 12:45:00",
        updatedAt: "2024-10-24 12:50:00",
      },
    ];

    const mockSentLetters: ILetter[] = [
      {
        letterId: 3,
        senderId: "125",
        senderNickname: "파피몬",
        createdAt: "2024-10-25 09:00:00",
        updatedAt: "2024-10-25 09:30:00",
      },
      {
        letterId: 4,
        senderId: "126",
        senderNickname: "가루몬",
        createdAt: "2024-10-27 10:15:00",
        updatedAt: "2024-10-27 10:45:00",
      },
    ];

    setLetters(activeTab === "received" ? mockReceivedLetters : mockSentLetters);
  }, [activeTab]);

  const backBtn = () => navigate(-1);

  const Hambtn = () => setMyPageVisible(true);

  const closeMyPage = () => setMyPageVisible(false);

  const fetchLetterDetails = (letterId: number) => {
    const mockDetail: IReadLetter = {
      letterId,
      senderId: "123",
      senderNickname: "민준",
      content: "편지내용이야",
      picture: "편지 S3 링크",
      reaction: "좋아요",
      createdAt: "2024-10-24 12:50:00",
      updatedAt: "2024-10-24 12:55:00",
    };

    setSelectedLetter(mockDetail);
    setReactionIcon(<i className="nes-icon is-small like"></i>); // 기본 아이콘
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setReactionIcon(null); // 모달 닫을 때 아이콘 초기화
  };

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleReactionChange = (icon: JSX.Element) => {
    setReactionIcon(icon);
    if (selectedLetter) {
      setSelectedLetter({ ...selectedLetter, reaction: "아이콘 업데이트됨" }); // 실제 데이터 변경은 필요 없음, 시각적 업데이트만
    }
  };

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
          <div css={letterItem} key={letter.letterId} onClick={() => fetchLetterDetails(letter.letterId)}>
            <div css={letterContent}>
              <p>{letter.senderNickname}</p>
            </div>
            <div css={letterDate}>{new Date(letter.createdAt).toLocaleDateString('ko-KR')}</div>
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
                <span>From. {selectedLetter.senderNickname}</span>
                <button css={closeButtonStyle} onClick={closeReplyModal}>✖️</button>
              </div>
              <div css={modalBodyStyle}>
                <p>{selectedLetter.content}</p>
                {selectedLetter.picture && (
                  <img src={selectedLetter.picture} alt="편지 이미지" style={{ width: '100%', marginTop: '10px' }} />
                )}
                <p>반응: {reactionIcon}</p>
              </div>
              <div css={modalActionsStyle}>
                <div css={reactionIconsStyle}>
                  <i className="nes-icon is-small heart" onClick={() => handleReactionChange(<i className="nes-icon is-small heart"></i>)}></i>
                  <i className="nes-icon is-small star" onClick={() => handleReactionChange(<i className="nes-icon is-small star"></i>)}></i>
                  <i className="nes-icon is-small like" onClick={() => handleReactionChange(<i className="nes-icon is-small like"></i>)}></i>
                </div>
                <Button 
                  backgroundColor='#fff' 
                  color='#000' 
                  variant="outlined" 
                  width='40%'
                  handler={closeDeleteModal}>
                    답장하기
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

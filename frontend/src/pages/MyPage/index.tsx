import { useEffect, useState } from 'react';
import {
  Container,
  MyInfo,
  InfoSection,
  StatsSection,
  CollectionSection,
  closeButtonStyle,
  contents,
  VerticalTextSection,
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  inputStyle,
  modalActionsStyle,
  NicknameStyle,
  UsernameStyle,
  ArrowButton,
  BirthInputCss
} from './styles';
import Warning from '@/assets/icons/Warning.png'
import PixelContainer from '../../components/PixelContainer';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import { useUserInfoStore } from '@/stores/userInfoStore';
import useEasterEggStore from '@/stores/easterEggStore';
import { useCollectionStore } from '@/stores/collectionStore';
import { getMyInfo, updateNickname} from '@/apis/myPageService';
import BirthInput from '@/components/Birth';

export const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState<string | null>(null);  // 메시지 상태 추가
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // 메시지 모달 상태 추가
  const { name, userId, nickname, birth ,assets, isInitialized, setUserInfo } = useUserInfoStore();
  const { completedChallengesCount } = useEasterEggStore();
  const { collections, fetchCollections, totalCollections } = useCollectionStore();
  const itemsPerPage = 3;
  const totalPages = Math.ceil(totalCollections / itemsPerPage);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getMyInfo();
        if(!data) return
        setUserInfo({
          isInitialized: true,
          userId: data.memberId,
          name: data.name,
          email: data.email,
          provider: data.provider,
          providerId: data.providerId,
          nickname: data.nickname,
          assets: data.assets,
          birth: data.birth,
        });
      } catch (error) {
      }
    };

    if (!isInitialized) {
      fetchUserInfo();
    }

    if (userId) {
      fetchCollections(Number(userId), currentPage, itemsPerPage);
    }
  }, [isInitialized, setUserInfo, userId, currentPage, fetchCollections]);

  console.log('생일',birth)

  const handleEditNickname = () => {
    setIsEditing(true);
    setNewNickname(nickname);
  };

  const handleSaveNickname = async () => {
    try {
      await updateNickname(newNickname);
      setUserInfo({ nickname: newNickname });
      setIsEditing(false);
    } catch (error: any) {
      if (error.message === "이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해 주세요.") {
        setMessage("이미 사용 중인 닉네임입니다.");
        setIsMessageModalOpen(true);
      } else {
        setMessage("이미 사용 중인 닉네임입니다.");
        setIsMessageModalOpen(true);
      }
    }
  };
  


  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setMessage(null); 
  };


  return (
    <div>
      <div css={Container}>
        <PixelContainer
          width="90%"
          height="80vh"
          children={
            <div css={contents}>
              <div css={MyInfo}>나의 정보</div>

              <div css={InfoSection}>
                <div>
                  <img src={assets} width={50} height={50} alt="User Asset" />
                  <div css={VerticalTextSection}>
                    <div>
                      <h3 css={NicknameStyle}>{nickname}</h3>
                      <h4 css={BirthInputCss}><BirthInput/></h4>
                    </div>
                      <h4 css={UsernameStyle}>{name}</h4>
                  </div>
                </div>

                <div>
                  <button onClick={handleEditNickname} css={closeButtonStyle}>
                    <img src="https://unpkg.com/pixelarticons@1.8.1/svg/edit.svg" alt="편집 버튼" width="30" height="30" />
                  </button>
                </div>
              </div>

              <div css={StatsSection}>
                <div>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/script-text.svg" alt="롤링페이퍼 아이콘" width="20" height="20" />
                  작성한 롤링페이퍼: n개
                </div>
                <div>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/trophy.svg" alt="도전과제 아이콘" width="20" height="20" />
                  달성한 도전과제: {completedChallengesCount}개
                </div>
                <div>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/mood-happy.svg" alt="도감 아이콘" width="20" height="20" />
                  저장된 동물 도감: {totalCollections}개
                </div>
              </div>

              <div css={CollectionSection}>
                <h3>{nickname}님의 도감</h3>
                <div className="items-container-wrapper">
                  <button className="arrow-left" css={ArrowButton} onClick={handlePreviousPage} disabled={currentPage === 0}>
                    ◀️
                  </button>
                  <div className="items-container">
                    {collections.map((collection, index) => (
                      <div key={index} className="item">
                        <img src={collection.assets} alt={collection.nickname} />
                        <p>{collection.nickname}</p>
                      </div>
                    ))}
                  </div>
                  <button className="arrow-right" css={ArrowButton} onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                    ▶️
                  </button>
                </div>
              </div>
            </div>
          }
        />
      </div>


      <Modal isOpen={isEditing} onClose={()=>setIsEditing(false)} title="닉네임 수정">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            <div css={modalHeaderStyle}>
              <span>닉네임 수정</span>
            </div>
            <div css={inputStyle}>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                maxLength={8}
                placeholder="새 닉네임 입력"
              />
            </div>
            <div css={modalActionsStyle}>
              <Button
                backgroundColor='#4CAF50'
                color='#000'
                variant="outlined"
                width='30%'
                handler={handleSaveNickname}>
                저장
              </Button>
              <Button
                backgroundColor='#4CAF50'
                color='#000'
                variant="outlined"
                width='30%'
                handler={() => setIsEditing(false)}>
                취소
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isMessageModalOpen} onClose={closeMessageModal} title="알림">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
          <img src={Warning} alt="경고 아이콘" width="30" height="30" />
            <p>{message}</p>
            <div css={modalActionsStyle}>
              <Button
                backgroundColor='#4CAF50'
                color='#000'
                variant="outlined"
                width='30%'
                handler={closeMessageModal}>
                닫기
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Container,
  // BackBtnContainer,
  // HamBtnContainer,
  MyInfo,
  InfoSection,
  StatsSection,
  CollectionSection,
  closeButtonStyle,
  contents,
  // HamBtnCss,
  // BackBtnCss,
  // slidePanelStyle,
  // panelContentStyle,
  VerticalTextSection,
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  inputStyle,
  modalActionsStyle,
  NicknameStyle,
  UsernameStyle,
  ArrowButton,
} from './styles';
import PixelContainer from '../../components/PixelContainer';
// import NavButton from '../../assets/icons/NavButton.png';
// import BackButton from '../../assets/icons/BackButton.png';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
// import { Hamberger } from '../Hamberger';
import { useUserInfoStore } from '@/stores/userInfoStore';
import useEasterEggStore from '@/stores/easterEggStore';
import { useCollectionStore } from '@/stores/collectionStore';
import { getMyInfo, updateNickname } from '@/apis/myPageService';
// import { Header } from '@/components/Header';
export const MyPage = () => {
  // const [mypageVisible, setMyPageVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // const navigate = useNavigate();
  const { name, userId, nickname, assets, isInitialized, setUserInfo } = useUserInfoStore();
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
        // console.error("Failed to fetch user info:", error);
      }
    };

    if (!isInitialized) {
      fetchUserInfo();
    }

    if (userId) {
      fetchCollections(Number(userId), currentPage, itemsPerPage);
    }
  }, [isInitialized, setUserInfo, userId, currentPage, fetchCollections]);

  // const close = () => {
  //   navigate(-1);
  // };

  // const openMenu = () => {
  //   setMyPageVisible(true);
  // };

  // const closeMyPage = () => {
  //   setMyPageVisible(false);
  // };

  const handleEditNickname = () => {
    setIsEditing(true);
    setNewNickname(nickname);
  };

  const handleSaveNickname = async () => {
    try {
      await updateNickname(newNickname);
      setUserInfo({ nickname: newNickname });
      setIsEditing(false);
      // console.log("닉네임 업데이트 성공:", newNickname);
    } catch (error) {
      // console.error("닉네임 업데이트 중 오류 발생:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div css={Container}>
        {/* <div css={BackBtnContainer}>
          <button css={BackBtnCss} onClick={close}>
            <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
          </button>
        </div>

        <div css={HamBtnContainer}>
          <button css={HamBtnCss} onClick={openMenu}>
            <img src={NavButton} alt="햄버거 버튼" width={40} />
          </button>
        </div> */}

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
                    <h3 css={NicknameStyle}>{nickname}</h3>
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



              <div css={CollectionSection}>
                <h3>{nickname}님의 보상목록</h3>
                <div>◀️ 할 지 말 지 고민 ▶️</div>
              </div>
            </div>
          }
        />
      </div>
      {/* <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div> */}

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
    </div>
  );
};

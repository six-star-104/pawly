import { useEffect, useState } from "react";
import * as style from "./styles";
import Warning from "@/assets/icons/Warning.png";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import { useUserInfoStore } from "@/stores/userInfoStore";
import useEasterEggStore from "@/stores/easterEggStore";
import { useCollectionStore } from "@/stores/collectionStore";
import { updateNickname } from "@/apis/myPageService";
import useFetchUserRollingpaper from "@/hooks/useFetchUserRollingpaper";
import BirthInput from "@/components/Birth";
export const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState<string | null>(null); // 메시지 상태 추가
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // 메시지 모달 상태 추가
  const { name, memberId, nickname, assets, isInitialized, setUserInfo } =
    useUserInfoStore();

  const { completedChallengesCount } = useEasterEggStore();
  const { collections, fetchCollections, totalCollections } =
    useCollectionStore();
  const { userRollingpapers, fetchRollingPapers } = useFetchUserRollingpaper();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalCollections / itemsPerPage);

  useEffect(() => {
    if (memberId) {
      fetchCollections(Number(memberId), currentPage, itemsPerPage);
    }
  }, [isInitialized, setUserInfo, memberId, currentPage, fetchCollections]);

  useEffect(() => {
    fetchRollingPapers();
  }, []);

  const handleEditNickname = () => {
    setIsEditing(true);
    setNewNickname(nickname);
  };

  const handleSaveNickname = async () => {
    try {
      await updateNickname(newNickname);
      setUserInfo({ nickname: newNickname });
      setIsEditing(false);
    } catch (error) {
      setMessage("이미 사용 중인 닉네임입니다.");
      setIsMessageModalOpen(true);
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
      <div css={style.Container}>
        <div css={style.myPageContent}>
          <div css={style.InfoSection}>
            <div css={style.infoContainer}>
              <img src={assets} width={80} height={80} alt="User Asset" />
              <div css={style.nicknameContainer}>
                <div className="nickname">{nickname} </div>
                <button onClick={handleEditNickname}>
                  <img
                    src="https://unpkg.com/pixelarticons@1.8.1/svg/edit.svg"
                    css={style.iconSize}
                  />
                </button>
              </div>
            </div>
            <div css={style.nameContainer}>
              <div className="name">{name}</div>
              <BirthInput />
            </div>
          </div>

          <div css={style.StatsSection}>
            <div>
              <img
                src="https://unpkg.com/pixelarticons@1.8.1/svg/script-text.svg"
                css={style.iconSize}
              />
              작성한 롤링페이퍼: {userRollingpapers.length}개
            </div>
            <div>
              <img
                src="https://unpkg.com/pixelarticons@1.8.1/svg/trophy.svg"
                css={style.iconSize}
              />
              달성한 도전과제: {completedChallengesCount}개
            </div>
            <div>
              <img
                src="https://unpkg.com/pixelarticons@1.8.1/svg/mood-happy.svg"
                css={style.iconSize}
              />
              저장된 동물 도감: {totalCollections}개
            </div>
          </div>

          <div css={style.CollectionSection}>
            <h3>{nickname} 님의 도감</h3>
            <div className="items-container-wrapper">
              <div className="items-container">
                {collections.map((collection, index) => (
                  <div key={index} className="item">
                    <img src={collection.assets} alt={collection.nickname} />
                    <p>{collection.nickname}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="arrow-left"
              css={style.ArrowButton}
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              ◀️
            </button>
            <button
              className="arrow-right"
              css={style.ArrowButton}
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              ▶️
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="닉네임 수정"
      >
        <div css={style.modalOverlayStyle}>
          <div css={style.modalContentStyle}>
            <div css={style.modalHeaderStyle}>
              <span>닉네임 수정</span>
            </div>
            <div css={style.inputStyle}>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                maxLength={8}
                placeholder="새 닉네임 입력"
              />
            </div>
            <div css={style.modalActionsStyle}>
              <Button
                backgroundColor="#4CAF50"
                color="#000"
                variant="outlined"
                width="30%"
                handler={handleSaveNickname}
              >
                저장
              </Button>
              <Button
                backgroundColor="#4CAF50"
                color="#000"
                variant="outlined"
                width="30%"
                handler={() => setIsEditing(false)}
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isMessageModalOpen}
        onClose={closeMessageModal}
        title="알림"
      >
        <div css={style.modalOverlayStyle}>
          <div css={style.modalContentStyle}>
            <img src={Warning} alt="경고 아이콘" width="30" height="30" />
            <p>{message}</p>
            <div css={style.modalActionsStyle}>
              <Button
                backgroundColor="#4CAF50"
                color="#000"
                variant="outlined"
                width="30%"
                handler={closeMessageModal}
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

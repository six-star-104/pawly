/** @jsxImportSource @emotion/react */
import useFetchUserRollingpaper from "../../hooks/useFetchUserRollingpaper";
import {
  ListContainer,
  container,
  tempBtn,
  confirmBtn,
  singleBtn,
} from "./styles";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { useRollingpaperStore } from "@/stores/rollingpaperStore";
import SingleRollingpaperList from "@/components/SingleRollingpaperList";
// import { useCreateRollingpaper } from "@/hooks/useCreateRollingpaper";
// 내가 받은 롤링페이퍼들 모아볼 수 있는 페이지
export const RollingPaperList = () => {
  // 스토어
  const { isRollingpaperChanged } = useRollingpaperStore();
  // 커스텀 훅
  const { userRollingpapers, createRollingpaper, fetchRollingPapers } =
    useFetchUserRollingpaper();

  useEffect(() => {
    fetchRollingPapers();
  }, [isRollingpaperChanged]);

  const [isOpen, setIsOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");

  const [confirmContent, setConfirmContent] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("에러 발생");

  // 임시 랜덤 생성 위치
  const [randomX, setRandomX] = useState(0);
  const [randomY, setRandomY] = useState(0);
  useEffect(() => {
    setRandomX(Math.random() * 100);
    setRandomY(Math.random() * 100);
  }, []);

  const createMailBox = async () => {
    try {
      const res = await createRollingpaper(`${newTitle}`, randomX, randomY);

      // await fetchMailBoxes(userLat, userLng);
      setNewTitle("");
      if (res === "sucess") {
        setConfirmContent("success");
        setIsOpen(false);
        return;
      }
      // 여기서 부터 에러단
      if (res === "B002") {
        setIsConfirmModalOpen(true);
        setConfirmContent("error");
        setErrorMessage("최대 3개까지 롤링페이퍼를 가질 수 있습니다");
      } else if (res === "B003") {
        setIsConfirmModalOpen(true);
        setConfirmContent("error");
        setErrorMessage("너무 가까이에 우체통이 존재합니다");
      }
    } catch (error) {
      // 에러상황 발생
    }
    setIsOpen(false);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <div css={container}>
      <div css={ListContainer}>
        {userRollingpapers &&
          userRollingpapers.map((rollingpaper) => (
            <SingleRollingpaperList rollingpaper={rollingpaper} key={rollingpaper.rollingPaperId}/>
          ))}
      </div>
          
      <div css={tempBtn}>
        <button onClick={() => setIsOpen(true)} className="nes-btn">
          롤링페이퍼 생성
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="우체통 생성"
      >
        <div>
          <p>현재 위치에 생성하시겠습니까?</p>
          <label htmlFor="">롤링페이퍼 제목</label> <br />
          <input
            type="text"
            value={newTitle}
            onChange={handleTitle}
            className="nes-input"
          />
          <div css={confirmBtn}>
            <button
              className={
                (newTitle.length === 0 ? "is-disabled" : "") + " nes-btn"
              }
              onClick={() => createMailBox()}
            >
              예
            </button>
            <button className="nes-btn" onClick={() => setIsOpen(false)}>
              아니오
            </button>
          </div>
          {/* </div>
        <div> */}
        </div>
      </Modal>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="경고"
      >
        {confirmContent === "error" ? (
          <>
            <p>{errorMessage}</p>
            <button
              className="nes-btn"
              css={singleBtn}
              onClick={() => setIsConfirmModalOpen(false)}
            >
              확인
            </button>
          </>
        ) : (
          <>
            <p>생성완료!</p>
            <button
              className="nes-btn"
              css={singleBtn}
              onClick={() => setIsConfirmModalOpen(false)}
            >
              확인
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};
